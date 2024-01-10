// BCS of Cannot use import statement outside a module in staging server
// const { Task } = require('../models');

module.exports = {
  async up() {
    // const taskModel = await Task.find({ taskDocuments: { $exists: true } }).lean();
    // await Promise.all(
    //   taskModel.map(async (data) => {
    //     const taskDocUpdate = data.taskDocuments
    //       .filter((value) => value)
    //       .map((item) => {
    //         const splitUrl = item.split('/');
    //         const urlSplit = splitUrl[splitUrl.length - 1].split('_');
    //         const fileName = decodeURI(urlSplit[1]);
    //         return { url: item, fileName };
    //       });
    //     await Task.findByIdAndUpdate(data._id, {
    //       taskDocuments: taskDocUpdate,
    //     });
    //   })
    // );
  },
  async down() {
    console.log("There's error in up so down is called");
  }
};