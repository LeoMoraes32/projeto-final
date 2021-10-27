const CarService = require('../service/CarService');

class CarController {
    async create(req, res){
        const result = await CarService.create(req.body);
        return res.status(201).json(result);        
    }

  

    async listByParams(req, res){
        
        if (Object.keys(req.query).length > 0){
            const result = await CarService.listByParams(req.query);
            return res.status(200).json(result);
        }else {
            const result = await CarService.list();
            return res.status(200).json(result);
        }
    }

    async listById(req, res){
        const result = await CarService.listById(req.params.id);
        return res.status(200).json(result);
    }

    async update(req, res){
        const result = await CarService.updateById(req.params.id, req.body);
        return res.status(204).json(result);
    }

    async delete(req, res){
        const result = await CarService.deleteById(req.params.id);
        return res.status(202).json(result);
    }
}

module.exports = new CarController();