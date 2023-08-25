const mongoose = require('mongoose');
const { encodeUrl } = require('../utils/common');

module.exports = {
  async up(db) {
    // replacing space from name with - bcs in aws image we have name like that
    function replaceSpacesWithHyphens(inputString) {
      return inputString.replace(/\s+/g, '-');
    }
    const LendingInstitution = db.collection('LendingInstitution');
    // bcs other lender are user created & in that we are getting createdBy field so finding only lender which is given by client
    let lenders = await LendingInstitution.find({ createdBy: { $exists: false } });
    lenders = await lenders.toArray();
    const promises = await lenders.map((lender) => {
      // TODO: need to take this from env & handle from the tojson & export this field when we do export
      const logo = `https://parallel-cdn.s3.amazonaws.com/institute/logo/${replaceSpacesWithHyphens(
        lender.lenderNameVisible
      )}.jpg`;
      const fileName = `${lender.lenderNameVisible}.jpg`;
      return LendingInstitution.updateOne(
        { _id: lender._id },
        {
          $set: {
            logo: { fileName, url: encodeUrl(logo), _id: mongoose.Types.ObjectId() },
          },
        }
      );
    });
    await Promise.all(promises);
  },
};
