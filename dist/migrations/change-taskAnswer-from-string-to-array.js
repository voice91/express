module.exports = {
  // async up() {
  async up(db) {
    // Connect to your MongoDB database
    // Retrieve all documents from the Task collection with taskAnswer as a string
    const Task = db.collection('Task');
    const tasksToUpdateCursor = await Task.find({
      taskAnswer: {
        $type: 'string'
      }
    });
    const tasksToUpdate = await tasksToUpdateCursor.toArray();
    const promises = await tasksToUpdate.map(async task => {
      await Task.updateOne({
        _id: task._id
      }, {
        $set: {
          taskAnswer: [{
            answer: task.taskAnswer,
            receivedAt: new Date(),
            answeredBy: 'user'
          }]
        }
      });
    });
    await Promise.all(promises);
  }
};