const {
  EnumOfActivityType
} = require("../models/enum.model");
module.exports = {
  async up(db) {
    const ActivityLog = await db.collection('ActivityLog');
    const activity = await ActivityLog.find({
      type: EnumOfActivityType.NOTE
    }).toArray();
    if (activity.length > 0) {
      await ActivityLog.deleteMany({
        type: 'note'
      });
    }
  },
  async down() {
    console.log("There's error in up so down is called");
  }
};