import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { LenderPlacement } from '../../models';
import { lenderPlacementService, userService } from '../../services';
import { uploadEmailAttachmentToS3 } from '../../services/s3.service';
import { logger } from '../../config/logger';
import config from '../../config/config';

const he = require('he');

// eslint-disable-next-line import/prefer-default-export
export const processEmailMessage = catchAsync(async (req, res) => {
  // This is used to extract specific part that matches the regex pattern from the decoded req.body.Htmlbody, as we only want message part from the req body.
  // he.decode decodes HTML-encoded text. It's commonly used to decode HTML entities like &lt; (represents <), &gt; (represents >), &amp; (represents &), and so on.
  const messageContent = /<div dir="ltr">(.*?)<\/div>/.exec(he.decode(req.body.HtmlBody));
  // need to set the message content in body tag as we have seperated the content for the threading on the basis of body tag.
  const message = req.body.StrippedTextReply ? `<body>${messageContent[0]}</body>` : 'This file is coming from email';

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
  const { postmarkInboundDomain } = config;
  // all the to fields
  const to = req.body.ToFull.filter((item) => !item.Email.includes(`@${postmarkInboundDomain}`)).map((item) => item.Email);
  const cc = req.body.CcFull.map((item) => item.Email);
  const placement = await LenderPlacement.findOne({ postmarkMessageId: { $elemMatch: { $eq: msgId[0] } } });
  logger.info(`MessageId of email received : ${msgId}`);
  if (placement) {
    const user = await userService.getOne({ email: req.body.From });
    const documents = [];
    await Promise.all(
      req.body.Attachments.map(async (attachment) => {
        Object.assign(attachment, { userId: user ? user._id : req.body.From });
        // enablePrivateAccess is passed to set private access for attachment uploaded to S3
        const url = await uploadEmailAttachmentToS3(attachment, config.aws.enablePrivateAccess);
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
    const update = {
      $push: {
        messages: {
          updatedAt: new Date(),
          message,
          documents,
          to,
          cc,
        },
      },
    };
    // if user found then store the userId in the sender else store the email in the senderEmail .
    if (user) {
      Object.assign(update.$push.messages, { sender: user._id });
    } else {
      Object.assign(update.$push.messages, { senderEmail: req.body.From });
    }
    await lenderPlacementService.updateLenderPlacement({ _id: placement._id }, update);
    logger.info(`message created for ${message} bcs ${user ? user.firstName : req.body.FromName} reply to email`);
  }
  // }

  return res.status(httpStatus.OK).send({ success: true });
});
