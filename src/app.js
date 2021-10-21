const express = require('express');
const router = require('./routes');

class App{

    constructor() {
        this.server = express();
        this.middlewares();
        this.route();
    
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes(){
        router(this.server);
    }

}

module.exports = new App();