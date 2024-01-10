module.exports = {
  async up(db) {
    const lenderTypesToFind = ['lifeco', 'hardMoney'];
    const LendingInstitution = await db.collection('LendingInstitution');
    const LenderContact = await db.collection('LenderContact');
    const LenderPlacement = await db.collection('LenderPlacement');
    const LenderProgram = await db.collection('LenderProgram');
    const LenderInstituteNotes = await db.collection('LenderInstituteNotes');
    const Task = await db.collection('Task');
    const LenderNotes = await db.collection('LenderNotes');
    const lendingInstitutes = await LendingInstitution.find({
      lenderType: {
        $in: lenderTypesToFind
      }
    }).toArray();
    await Promise.allSettled(lendingInstitutes.map(async item => {
      const lenderPlacement = await LenderPlacement.find({
        lendingInstitution: item._id
      }).toArray();
      await LendingInstitution.deleteOne({
        _id: item._id
      });
      await LenderContact.deleteMany({
        lenderInstitute: item._id
      });
      await LenderProgram.deleteMany({
        lenderInstitute: item._id
      });
      await LenderInstituteNotes.deleteMany({
        lenderInstitute: item._id
      });
      await Task.deleteMany({
        askingPartyInstitute: item._id
      });
      lenderPlacement.map(async value => {
        await LenderNotes.deleteMany({
          lenderPlacement: value._id
        });
      });
      await LenderPlacement.deleteMany({
        lendingInstitution: item._id
      });
    })).then(results => results.forEach(result => {
      if (result.status === 'rejected') {
        console.error(`Promise failed with error: ${result.reason}`);
      }
    }));
  },
  async down() {
    console.log("There's error in up so down is called");
  }
};