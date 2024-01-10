import httpStatus from 'http-status';
import config from "../../config/config";
import { catchAsync } from "../../utils/catchAsync";
import { lendingInstitutionService } from "../../services";
import { encodeUrl } from "../../utils/common";
import ApiError from "../../utils/ApiError";

// eslint-disable-next-line import/prefer-default-export
export const addLogo = catchAsync(async (req, res) => {
  const userEmail = req.user.email;
  const {
    adminEmails
  } = config;
  if (!adminEmails.includes(userEmail)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You don't have access to add the logo of lender");
  }
  // replacing space from name with - bcs in aws image we have name like that
  function replaceSpacesWithHyphens(inputString) {
    return inputString.replace(/\s+/g, '-');
  }

  // bcs other lender are user created & in that we are getting createdBy field so finding only lender which is given by client
  let lenders = await lendingInstitutionService.getLendingInstitutionList({
    createdBy: {
      $exists: false
    }
  });
  lenders = lenders.filter(lender => {
    return !(lender.logo && lender.logo.url && lender.logo.url.includes('/institute/logo'));
  });
  const promises = await lenders.map(lender => {
    // TODO: need to take this from env & handle from the tojson & export this field when we do export
    const logo = `https://parallel-cdn.s3.amazonaws.com/institute/logo/${replaceSpacesWithHyphens(lender.lenderNameVisible)}.jpg`;
    const fileName = `${lender.lenderNameVisible}.jpg`;
    // return LendingInstitution.updateOne(
    return lendingInstitutionService.updateLendingInstitutionDetails({
      _id: lender._id
    }, {
      logo: {
        fileName,
        url: encodeUrl(logo)
      }
      // logo: {},
    });
  });
  await Promise.all(promises);
  return res.status(httpStatus.CREATED).send({
    results: 'Logos added to lender'
  });
});