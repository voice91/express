module.exports = {
  /**
   * This is the 'up' migration function that updates documents in the 'LenderInstituteNotes' collection for add createdBy field .
   * Find LenderInstituteNotes with 'createdBy' field that not exists and update it with createdBy field using default advisorId .
   */
  async up(db) {
    const LenderInstituteNotes = await db.collection('LenderInstituteNotes');
    const User = await db.collection('User');
    const defaultAdvisor = await User.findOne({ email: 'richard@parallelcre.com', role: 'advisor' });
    const notesWithoutCreatedBy = await LenderInstituteNotes.find({ createdBy: { $exists: false } }).toArray();
    const notesIdsWithoutCreatedBy = notesWithoutCreatedBy.map((note) => note._id);
    if (defaultAdvisor) {
      const updatedNotes = await LenderInstituteNotes.updateMany(
        { _id: { $in: notesIdsWithoutCreatedBy } },
        { $set: { createdBy: defaultAdvisor._id, updatedBy: defaultAdvisor._id } }
      );
      const updatedDocCount = updatedNotes.acknowledged && updatedNotes.modifiedCount ? updatedNotes.modifiedCount : 0;
      console.log(` Number of lenderInstituteNotes updated : `, updatedDocCount);
    }
  },
  async down() {
    console.log("There's error in up so down is called");
  },
};
