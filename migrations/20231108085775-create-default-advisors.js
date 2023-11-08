const _ = require('lodash');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const { EnumRoleOfUser } = require('../models/enum.model');

dotenv.config();

module.exports = {
  async up(db) {
    const User = db.collection('User');
    // JSON.parse as from env we are getting it in string
    const defaultAdvisorsToAddDeal = JSON.parse(process.env.DEFAULT_ADVISORS_TO_ADD_DEAL);
    await Promise.all(
      defaultAdvisorsToAddDeal.map(async (item) => {
        const advisor = await User.findOne({ email: item });
        if (!advisor) {
          const userBody = {
            email: item,
            password: await bcrypt.hash(`${_.startCase(item.split('@')[0])}5`, 8),
            firstName: item.split('@')[0],
            lastName: 'cre',
            role: EnumRoleOfUser.ADVISOR,
            companyName: 'ParallelCRE',
            emailVerified: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            emailPresentingPostmark: 'true',
          };
          await User.insertOne(userBody);
        }
      })
    );
  },
  async down() {
    console.log("There's error in up so down is called");
  },
};
