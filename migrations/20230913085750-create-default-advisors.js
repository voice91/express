const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { EnumRoleOfUser } = require('../models/enum.model');
// When we use require, it imports the entire module in our case it was importing the configuration object as a property named default, below line is if we want to access it without default
const config = require('../config/config').default;

module.exports = {
  async up(db) {
    const User = db.collection('User');
    const { defaultAdvisorToAddDeal } = config;
    await Promise.all(
      defaultAdvisorToAddDeal.map(async (item) => {
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
