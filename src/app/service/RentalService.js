const RentalRepository = require('../repository/RentalRepository');

class RentalService {
    async create(payload){
        const result = await RentalRepository.create(payload);
        return result;
    }

    async list(payload){
        try{
            const result = await RentalRepository.list(payload);
            return result;
        } catch(error){
            return error;
        }
    }

    async listById(payload){
        try{
            const result = await RentalRepository.listById(payload);
            return result;
        } catch(error){
            return error
        }
    }

    async updateById(payload, body){
        try{
            const result = await RentalRepository.updateById(payload, body);
            return result;
        } catch(error){
            return error;
        }
    }

    async deleteById(payload){
        try{
            const result = await RentalRepository.deleteById(payload);
            if(!result) throw Error("Not found");
            return result;
        } catch(error){
            return error;
        }
    }
}

module.exports = new RentalService();
