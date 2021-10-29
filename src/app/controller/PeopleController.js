const PeopleService = require('../service/PeopleService');
const PeopleSchema = require('../schema/PeopleSchema');

class PeopleController {
    async create(req, res){
        const result = await PeopleService.create(req.body);
        if(!result){
            return res.status(403).json('Age is under 18');
        }
        return res.status(201).json(result);        
    }

    async list(req, res){
        req.query.perPage = parseInt(req.query.perPage);
        req.query.page = parseInt(req.query.page);

        if (Object.keys(req.query).length == 2) {
            const people = await PeopleService.list(req.query);
            return res.status(200).json({ total:people.length, people});
        } else {
            const people = await PeopleService.listByParams(req.query);
            return res.status(200).json({ total:people.length, people});
        }
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