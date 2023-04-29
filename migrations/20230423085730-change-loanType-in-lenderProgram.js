module.exports = {
  async up(db) {
    await db
      .collection('LenderProgram')
      .find({})
      .forEach((program) => {
        const loanTypeMap = {
          construction: 'construction',
          lightBridge: 'lightTransitional',
          heavyBridge: 'heavyTransitional',
          permanent: 'stabilized',
          land: 'preDevelopment/land',
        };
        if (program.loanType) {
          const updatedLoanTypes = program.loanType.map((value) => loanTypeMap[value] || value);
          db.collection('LenderProgram').updateOne({ _id: program._id }, { $set: { loanType: updatedLoanTypes } });
        }
      });
  },
  async down() {
    console.log("There's error in up so down is called");
  },
};
