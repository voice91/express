import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { LenderPlacement } from '../../models';
import { EnumOfNotesTypeOfLenderNotes } from '../../models/enum.model';
import { lenderNotesService } from '../../services';

const he = require('he');

// eslint-disable-next-line import/prefer-default-export
export const list = catchAsync(async (req, res) => {
  const senderName = req.body.FromName;
  const message = req.body.StrippedTextReply;

  let msgId;
  if (req.body.Headers) {
    // eslint-disable-next-line array-callback-return
    msgId = req.body.Headers.filter((item) => {
      if (item.Name === 'References') {
        return item.Value;
      }
      // eslint-disable-next-line array-callback-return
    }).map((value) => {
      const decodedString = he.decode(value.Value);
      const regex = /<([^@>]+)@/;
      const matches = decodedString.match(regex);
      if (matches && matches.length > 1) {
        return matches[1];
      }
    });
  }

  const placement = await LenderPlacement.findOne({ postmarkMessageId: { $elemMatch: { $eq: msgId[0] } } });

  if (placement) {
    const createLenderNotesBody = {
      createdBy: placement.createdBy,
      updatedBy: placement.updatedBy,
      user: placement.createdBy,
      content: message,
      lenderInstitute: placement.lendingInstitution,
      lenderPlacement: placement._id,
      notesType: EnumOfNotesTypeOfLenderNotes.INTERNAL_NOTE,
      responseSenderName: senderName,
    };

    await lenderNotesService.createLenderNotes(createLenderNotesBody);
  }

  return res.status(httpStatus.OK).send({ success: true });
});
