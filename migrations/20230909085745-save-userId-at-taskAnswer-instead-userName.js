module.exports = {
  async up(db) {
    const Task = await db.collection('Task');
    const User = await db.collection('User');
    const task = await Task.find({}).toArray();
    await Promise.all(
      task.map(async (item) => {
        const updatedAnswers = await Promise.all(
          item.taskAnswer.map(async (value) => {
            const user = await User.findOne({ firstName: value.answeredBy });
            if (user) {
              Object.assign(value, { answeredBy: user._id });
              return value;
            }
          })
        );
        const filteredAnswers = updatedAnswers.filter((value) => value !== undefined);
        await Task.updateOne({ _id: item._id }, { $set: { taskAnswer: filteredAnswers } });
      })
    );
  },
  async down() {
    console.log("There's error in up so down is called");
  },
};
