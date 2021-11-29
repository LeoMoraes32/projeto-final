const mongoose = require('mongoose');
const config = require('../../../config/config');

const atlas = 'mongodb+srv://leonardo32moraes:senhasenha123qwe@cluster0.rmlzg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const beforeHeroku = (`mongodb://${config.database.host}/${config.database.collection}`, {
  user: config.database.username,
  pass: config.database.password
});

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    return mongoose.connect(`mongodb://${config.database.host}/${config.database.collection}`, {
      user: config.database.username,
      pass: config.database.password
    });
  }

  disconnect() {
    return mongoose.connection.close();
  }
}

module.exports = new Database().connect();
