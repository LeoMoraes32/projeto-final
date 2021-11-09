const { paginateSerialize, serialize } = require('../serialize/RentalSerialize');

const RentalService = require('../service/RentalService');

class RentalController {
    async create(req, res){
        try{
            const result = await RentalService.create(req.body);
            return res.status(201).json(serialize(result));

        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async list(req, res){
        try{
            const result = await RentalService.list(req.query);
            return res.status(200).json(paginateSerialize(result));
        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async listById(req, res){
        try{
            const result = await RentalService.listById(req.params.id);
            return res.status(200).json(serialize(result));
        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async update(req, res){
        try{
            const result = await RentalService.updateById(req.params.id, req.body);
            return res.status(200).json(serialize(result));
        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async delete(req, res){
        try{
            const result = await RentalService.deleteById(req.params.id);
            return res.status(202).json({});

        }catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }
}

module.exports = new RentalController();