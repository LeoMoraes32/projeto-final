const CarSchema = require('../schema/CarSchema');

class CarRepository {
    async create(payload){
        return CarSchema.create(payload);
    }
    async list(payload, offset, limit){

        offset = parseInt(offset) || 0;
        limit = parseInt(limit) || 100;

        return CarSchema.paginate(payload, {offset, limit});
    }

    async listById(payload){
        return CarSchema.findById(payload);
    }

    async updateById(id, body){
        return CarSchema.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(payload){
        return CarSchema.findByIdAndDelete(payload);
    }
}
module.exports = new CarRepository();