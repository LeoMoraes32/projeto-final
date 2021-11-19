const setupDB = require('./support/cleanDatabase');
const MongoDatabase = require('../src/infra/database/mongo');

global.afterEach(async () => await setupDB());
global.afterAll(async () => await MongoDatabase.disconect());
