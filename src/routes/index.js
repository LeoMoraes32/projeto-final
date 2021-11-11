const { Router } = require('express');
const people = require('./people.router');
const car = require('./car.router');
const authenticate = require('./authenticate.router');
const rental = require('./rental.router');

module.exports = (server) => {
  server.use((req, res, next) => {
    people(server, new Router());
    car(server, new Router());
    authenticate(server, new Router());
    rental(server, new Router());
    next();
  });
};
