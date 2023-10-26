module.exports = {
  /**
   * Access the 'LenderPlacement' and 'User' collections from the database
   * Find all 'LenderPlacement' documents with 'messages' field that exists
   * Process each 'LenderPlacement' document asynchronously
   * Process each message in the 'messages' array of the 'LenderPlacement' document
   * Find a 'User' with matching 'firstName' from the message sender
   * If a matching 'User' is found, Update the 'sender' field of the message in the 'LenderPlacement' document
   */
  async up(db) {
    const LenderPlacement = await db.collection('LenderPlacement');
    const User = await db.collection('User');
    // Find all 'LenderPlacement' documents with 'messages' field that exists
    const placements = await LenderPlacement.find({ messages: { $exists: true } }).toArray();
    let count = 0;
    await Promise.all(
      placements.map(async (placement) => {
        await Promise.all(
          placement.messages.map(async (msg) => {
            const user = await User.findOne({ firstName: msg.sender });
            if (user) {
              const result = await LenderPlacement.updateOne(
                { _id: placement._id, 'messages._id': msg._id },
                {
                  $set: {
                    'messages.$.sender': user._id,
                  },
                }
              );
              if (result && result.modifiedCount) {
                count += 1;
              }
            }
          })
        );
      })
    );
    console.log('Number of messages updated by migration: ', count);
  },
  async down() {
    console.log("There's error in up so down is called");
  },
};
