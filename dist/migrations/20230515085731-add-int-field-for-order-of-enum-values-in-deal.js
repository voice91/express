module.exports = {
  async up(db) {
    const stageOrderMapping = {
      closing: 1,
      selectingLender: 2,
      outInMarket: 3,
      preparingMaterials: 4,
      new: 5,
      onHold: 6,
      closed: 7
    };
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const stage in stageOrderMapping) {
      const orderNo = stageOrderMapping[stage];
      db.collection('Deal').updateMany({
        stage
      }, {
        $set: {
          orderOfStage: orderNo
        }
      });
    }
  },
  async down() {
    console.log("There's error in up so down is called");
  }
};