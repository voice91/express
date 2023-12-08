module.exports = {
  async up(db) {
    const LenderContact = db.collection('LenderContact');
    const User = db.collection('User');
    const lenderContact = await LenderContact.find({}).toArray();
    await Promise.all(
      lenderContact.map(async (item) => {
        const user = await User.findOne({ email: item.email });
        if (user) {
          LenderContact.updateMany({ email: user.email }, { $set: { user: user._id } });
        }
      })
    );
    const usersNotInLenderContact = await User.find({
      role: 'lender',
      email: {
        $nin: await LenderContact.distinct('email'),
      },
    }).toArray();

    await Promise.all(
      usersNotInLenderContact.map(async (item) => {
        await User.updateOne({ _id: item._id }, { $set: { active: false } });
      })
    );
  },
  async down() {
    console.log("There's error in up so down is called");
  },
};
