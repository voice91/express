module.exports = {
  async up(db) {
    const EnumStageOfLenderPlacementWithNumber = {
      CLOSED: { value: 1, name: 'closed' },
      CLOSING: { value: 2, name: 'closing' },
      TERMS_SHEET_RECEIVED: { value: 3, name: 'termsSheetReceived' },
      TERMS_RECEIVED: { value: 4, name: 'termsReceived' },
      REVIEWING: { value: 5, name: 'reviewing' },
      SENT: { value: 6, name: 'sent' },
      NEW: { value: 7, name: 'new' },
      NOT_RESPONSIVE: { value: 8, name: 'notResponsive' },
      NOT_COMPETITIVE: { value: 9, name: 'notCompetitive' },
      PASS: { value: 10, name: 'pass' },
    };

    // Iterate through each stage and update the corresponding LenderPlacement documents
    // eslint-disable-next-line no-restricted-syntax
    for (const [, value] of Object.entries(EnumStageOfLenderPlacementWithNumber)) {
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
