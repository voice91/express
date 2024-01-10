module.exports = {
  async up(db) {
    const LenderContact = db.collection('LenderContact');
    const lenderContacts = await LenderContact.find({}).toArray();
    const updateLenderContacts = lenderContacts.map(async doc => {
      const unsetFields = {};
      // Identify and store keys with empty strings or null values
      // eslint-disable-next-line no-restricted-syntax
      for (const key in doc) {
        if (doc[key] === '' || doc[key] === null) {
          unsetFields[key] = '';
        }
      }
      // Update the document by unsetting the identified fields
      if (Object.keys(unsetFields).length > 0) {
        await LenderContact.updateOne({
          _id: doc._id
        }, {
          $unset: unsetFields
        });
      }
    });
    await Promise.all(updateLenderContacts);
  },
  async down() {
    console.log("There's error in up so down is called");
  }
};