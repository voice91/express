module.exports = {
  /**
   * This is the 'up' migration function that updates documents in the 'User' collection for updating sponsor field from array type to objectId(single). .
   * It finds users with a 'sponsor' field that exists and modifies them accordingly.
   * If sponsor field present in the document and value of that is not empty array then assign the first element as value of sponsor field.
   * Else value is empty array then remove sponsor field from document.
   */
  async up(db) {
    const User = await db.collection('User');
    const users = await User.find({ sponsor: { $exists: true } }).toArray();
    let count = 0;
    await Promise.all(
      users.map(async (user) => {
        let result;
        if (user.sponsor.length) {
          result = await User.updateOne({ _id: user._id }, { $set: { sponsor: user.sponsor[0] } });
        } else if (Array.isArray(user.sponsor) && !user.sponsor.length) {
          result = await User.updateOne({ _id: user._id }, { $unset: { sponsor: '' } });
        }
        if (result && result.modifiedCount) {
          count += 1;
        }
      })
    );
    console.log('Number of users updated by migration: ', count);
  },
  async down() {
    console.log("There's error in up so down is called");
  },
};
