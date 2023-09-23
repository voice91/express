const mongoose = require('mongoose');

module.exports = {
  async up(db) {
    const DealSummary = await db.collection('DealSummary');
    const Deal = await db.collection('Deal');
    const dealSummary = await DealSummary.find({ heading: { $exists: false } }).toArray();
    await Promise.all(
      dealSummary.map(async (item) => {
        const deal = await Deal.findOne({ _id: item.deal });
        const id = mongoose.Types.ObjectId();
        const { dealName } = deal;
        const cityState = `${deal.city}, ${deal.state}`;
        const dealInfo = `${deal.loanAmount} ${deal.assetType} ${deal.loanType} Financing Request`;

        const heading = { _id: id, dealName, cityState, dealInfo };

        await DealSummary.updateOne({ _id: item._id }, { $set: { heading } });
      })
    );
  },
  async down() {
    console.log("There's error in up so down is called");
  },
};
