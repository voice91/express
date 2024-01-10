const bcrypt = require('bcryptjs');
const {
  EnumRoleOfUser
} = require("../models/enum.model");
module.exports = {
  async up(db) {
    const User = await db.collection('User');
    const LenderContacts = await db.collection('LenderContact');
    const LendingInstitution = await db.collection('LendingInstitution');
    const lenderContact = await LenderContacts.find({}).toArray();
    await Promise.all([lenderContact.map(async item => {
      const user = await User.findOne({
        email: item.email
      });
      const lenderInstitute = await LendingInstitution.findOne(item.lenderInstitute);
      if (!user) {
        const userBody = {
          firstName: item.firstName,
          companyName: lenderInstitute.lenderNameVisible,
          lastName: item.lastName,
          role: EnumRoleOfUser.LENDER,
          enforcePassword: true,
          email: item.email,
          emailVerified: true,
          password: await bcrypt.hash(Math.random().toString(36).slice(-10), 8)
        };
        await User.insertOne(userBody);
      }
    })]);
  },
  async down() {
    console.log("There's error in up so down is called");
  }
};