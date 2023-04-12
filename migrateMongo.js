const migrateMongo = require('migrate-mongo');
// const migrateMongo = require('migrateMongo');
// const logger = require('../config/winston');

function migrate() {
  migrateMongo.database
    .connect()
    .then(({ db }) => migrateMongo.up(db))
    .catch((error) => {
      // logger.error('error in migrate database: ', error);
      console.log('error in migrate database: ', error);
    })
    .then((migratedItems) => {
      // logger.info(`migrated items= ${migratedItems.length}`);
      console.log(`migrated items= ${migratedItems.length}`);
    });
}

module.exports = migrate;
