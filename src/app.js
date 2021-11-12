require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require('express');
const router = require('./routes');

require('./infra/database/mongo');

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    router(this.server);
  }
}

module.exports = new App().server;
