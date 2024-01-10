module.exports = {
  /**
   * This is the 'up' migration function that updates documents in the 'Sponsor' collection for removing borrowers and borrowersEmails field .
   * Find sponsors with 'borrowers' field that exists and remove borrowers and borrowersEmails field .
   * borrowers and borrowersEmails fields removed because we used virtual for borrowers.
   */
  async up(db) {
    const Sponsor = await db.collection('Sponsor');
    const sponsors = await Sponsor.updateMany({
      borrowers: {
        $exists: true
      }
    }, {
      $unset: {
        borrowers: 1,
        borrowersEmails: 1
      }
    });
    console.log(`Number of sponsors updated: `, sponsors.modifiedCount);
  },
  async down() {
    console.log("There's error in up so down is called");
  }
};