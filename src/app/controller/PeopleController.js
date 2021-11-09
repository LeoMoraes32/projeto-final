const { paginateSerialize, serialize } = require('../serialize/PeopleSerialize');

const PeopleService = require('../service/PeopleService');

class PeopleController {
    async create(req, res){
        try{
            const result = await PeopleService.create(req.body);
            return res.status(201).json(serialize(result));

        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async list(req, res){
        try{
            const result = await PeopleService.list(req.query);
            return res.status(200).json(paginateSerialize(result));
        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async listById(req, res){
        try{
            const result = await PeopleService.listById(req.params.id);
            return res.status(200).json(serialize(result));
        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async update(req, res){
        try{
            const result = await PeopleService.updateById(req.params.id, req.body);
            return res.status(200).json(serialize(result));
        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async delete(req, res){
        try{
            const result = await PeopleService.deleteById(req.params.id);
            return res.status(202).json({});
        }catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }
}

module.exports = new PeopleController();