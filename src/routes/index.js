const { Router } = require('express');
const people = require('../routes/people.router');
const car = require('../routes/car.router');
const authenticate = require('../routes/authenticate.router');
const rental = require('../routes/rental.router');
const test = require('../routes/test.router');

module.exports = server => {
    server.use((req, res, next) => { 
        people(server, new Router());
        car(server, new Router());
        authenticate(server, new Router());
        rental(server, new Router());
        next();
    });
}
