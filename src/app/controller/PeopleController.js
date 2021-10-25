const PeopleService = require('../service/PeopleService');

class PeopleController {
    async create(req, res){
        const result = await PeopleService.create(req.body);
        return res.status(201).json(result);        
    }

    async list(req, res){
        const result = await PeopleService.list();
        return res.status(200).json(result);
    }

    async listById(req, res){
        const result = await PeopleService.listById(req.params.id);
        return res.status(200).json(result);
    }

    async update(req, res){
        const result = await PeopleService.updateById(req.params.id, req.body);
        return res.status(204).json(result);
    }

    async delete(req, res){
        const result = await PeopleService.deleteById(req.params.id);
        return res.status(202).json(result);
    }
}

module.exports = new PeopleController();