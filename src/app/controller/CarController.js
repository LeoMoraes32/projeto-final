const { serialize, paginateSerialize } = require('../serialize/CarSerialize');
const CarService = require('../service/CarService');

class CarController {
    async create(req, res){
        try{
            const result = await CarService.create(req.body);
            return res.status(201).json(serialize(result));        
        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async list(req, res){
        try{
            const result = await CarService.list(req.query);
            return res.status(200).json(paginateSerialize(result));
        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async listById(req, res){
        try{
            const result = await CarService.listById(req.params.id);
            return res.status(200).json(serialize(result));
        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async update(req, res){
        try{
            const result = await CarService.updateById(req.params.id, req.body);
            return res.status(200).json(serialize(result));
        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async patch(req, res){
        try{
            const { idCar, idAcessorios} = req.params;
            const result = await CarService.patch(idCar, idAcessorios, req.body);
            return res.status(200).json(serialize(result));
        }catch (error){
            return res.status(400).json({ description: error.path, name: error.message });
        }
    }

    async delete(req, res){
        try{
            const result = await CarService.deleteById(req.params.id);
            return res.status(202).json({});
        } catch(error){
            return res.status(400).json({ description: error.path, name: error.message});
        }
    }
}

module.exports = new CarController();