module.exports = {
  async up(db) {
    const DealSummary = await db.collection('DealSummary');
    await DealSummary.updateMany(
      { sponserOverview: { $exists: true } },
      { $rename: { sponserOverview: 'sponsorOverview' } }
    );
  },
  async down() {
    console.log("There's error in up so down is called");
  },
};
