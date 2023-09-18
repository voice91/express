import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { LenderPlacement } from '../../models';
import { lenderPlacementService, userService } from '../../services';
import { uploadEmailAttachmentToS3 } from '../../services/s3.service';
import { logger } from '../../config/logger';

const he = require('he');

// eslint-disable-next-line import/prefer-default-export
export const processEmailMessage = catchAsync(async (req, res) => {
  const message = req.body.StrippedTextReply ? req.body.StrippedTextReply : 'This file is coming from email';

  let msgId;
  if (req.body.Headers) {
    // Filter the Headers array to find the item with the name 'References'
    // eslint-disable-next-line array-callback-return
    msgId = req.body.Headers.filter((item) => {
      if (item.Name === 'References') {
        return item.Value;
      }
      // eslint-disable-next-line array-callback-return
    }).map((value) => {
      // Decode the value using 'he' library
      const decodedString = he.decode(value.Value);

      // Regular expression pattern to extract the desired string
      const regex = /<([^@>]+)@/;
      const matches = decodedString.match(regex);

      // If there is a match and it has at least one group
      if (matches && matches.length > 1) {
        return matches[1]; // Return the captured value
      }
    });
  }

  const placement = await LenderPlacement.findOne({ postmarkMessageId: { $elemMatch: { $eq: msgId[0] } } });
  logger.info(`MessageId of email received : ${msgId}`);
  if (placement) {
    const user = await userService.getOne({ email: req.body.From });
    const documents = [];
    await Promise.all(
      req.body.Attachments.map(async (attachment) => {
        // TODO: need to add condition when we don't have user in out DB
        Object.assign(attachment, { userId: user._id });
        const url = await uploadEmailAttachmentToS3(attachment);
        documents.push({ url, fileName: attachment.Name, fileType: attachment.ContentType });
      })
    );
    // if (placement.sendEmailPostmarkMessageId.includes(msgId[0])) {
    //   const createLenderNotesBody = {
    //     createdBy: placement.createdBy,
    //     updatedBy: placement.updatedBy,
    //     user: placement.createdBy,
    //     content: message,
    //     lenderInstitute: placement.lendingInstitution,
    //     lenderPlacement: placement._id,
    //     notesType: EnumOfNotesTypeOfLenderNotes.INTERNAL_NOTE,
    //     // TODO: need to add condition when we don't have user in out DB
    //     responseSenderName: user.firstName,
    //   };
    //   await lenderNotesService.createLenderNotes(createLenderNotesBody);
    //   logger.info(`lender note created for ${message} bcs ${user.firstName} reply to send deal email`);
    // } else {
    // as per the client requirement we all reply should store as message not lenderNotes
    // TODO: remove sendEmailPostmarkMessageId bcs we will not use it anymore
    await lenderPlacementService.updateLenderPlacement(
      { _id: placement._id },
      {
        $push: {
          messages: {
            // TODO: need to add condition when we don't have user in out DB
            sender: user.firstName,
            updatedAt: new Date(),
            message,
            documents,
          },
        },
      }
    );
    logger.info(`message created for ${message} bcs ${user.firstName} reply to email`);
  }
  // }

  return res.status(httpStatus.OK).send({ success: true });
});
