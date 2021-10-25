const PeopleService = require('../service/PeopleService');

class PeopleController {
    async create(req, res){
        const result = await PeopleService.create(req.body);
        return res.status(201).json(result);        
    }

    async list(req, res){
        const result = await PeopleService.list(req.body);
        return res.status(201).json(result);
    }
}

module.exports = new PeopleController();