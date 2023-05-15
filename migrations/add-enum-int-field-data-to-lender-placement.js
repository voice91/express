const { logger } = require('express-winston');
const { EnumStageOfLenderPlacementWithNumber } = require('../utils/enumStageOfLenderPlacement');

module.exports = {
  async up(db) {
    // Iterate through each stage and update the corresponding LenderPlacement documents
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(EnumStageOfLenderPlacementWithNumber)) {
      logger.info(`key : ${key}`);
      const LenderPlacement = db.collection('LenderPlacement');
      // eslint-disable-next-line no-await-in-loop
      LenderPlacement.updateMany({ stage: value.name }, { $set: { stageEnumWiseNumber: value.value } });
    }
  },
  // async down() {
  //   // Remove the stageEnumWiseNumber field from all LenderPlacement documents
  //   await LenderPlacement.updateMany({}, { $unset: { stageEnumWiseNumber: '' } });
  // },
};
