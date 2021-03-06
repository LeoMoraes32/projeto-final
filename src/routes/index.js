const { Router } = require('express');
const people = require('./people.router');
const car = require('./car.router');
const authenticate = require('./auth.router');
const rental = require('./rental.router');
const docs = require('./docs.router');
const reserve = require('./reserve.router');
const fleet = require('./fleet.router');

module.exports = (server) => {
  server.use((req, res, next) => {
    people(server, new Router());
    car(server, new Router());
    authenticate(server, new Router());
    rental(server, new Router());
    docs(server, new Router());
    reserve(server, new Router());
    fleet(server, new Router());
    next();
  });
};
