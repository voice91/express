module.exports = {
  async up(db) {
    const LenderPlacement = db.collection('LenderPlacement');
    const Deal = db.collection('Deal');
    const deal = await Deal.find({}).toArray();
    await Promise.all([deal.map(async item => {
      const lenderPlacement = await LenderPlacement.find({
        deal: item._id,
        terms: {
          $exists: true
        }
      }).toArray();
      lenderPlacement.map(async (placement, index) => {
        await LenderPlacement.updateOne({
          _id: placement._id
        }, {
          $set: {
            orderOfTerms: index
          }
        });
      });
    })]);
  },
  async down() {
    console.log("There's error in up so down is called");
  }
};