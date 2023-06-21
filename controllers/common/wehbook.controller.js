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
