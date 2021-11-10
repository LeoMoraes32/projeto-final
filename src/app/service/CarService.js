const { query } = require('express');
const CarRepository = require('../repository/CarRepository');

class CarService{
    async create(payload){
        try{
            const result = await CarRepository.create(payload);
            return result;
        } catch(error){
            return error;
        }
    }

    async list(payload){
        try{
            const result = await CarRepository.list(payload);
            return result;
        } catch(error){
            return error;
        }
    }

    async listById(payload){
        try{
            const result = await CarRepository.listById(payload);
            return result;
        } catch(error){
            return error;
        }
    }

    async updateById(id, body){
        try{
            const result = await CarRepository.updateById(id, body);
            return result;
        } catch(error){
            return error;
        }
    }

    async patchAcessory({id, idAcessory}, {descricao}){
        const car = await CarRepository.listById(id);
        if(!car) throw new Error;

        const result = await CarRepository.patchAcessory(idAcessory, descricao);
        return result;
    }

    async deleteById(payload){
        try{
            const result = await CarRepository.deleteById(payload);
            if(!result) throw Error("Not found");
            return result;
        } catch(error){
            return error;
        }
    }
}

module.exports = new CarService();