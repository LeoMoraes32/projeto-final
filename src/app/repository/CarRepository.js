const CarSchema = require('../schema/CarSchema');

class CarRepository {
    async create(payload){
        return CarSchema.create(payload);
    }
    async list($payload){
        const { page = 1, limit = 10 } = $payload;
        return CarSchema.find($payload).limit(limit * 1).skip((page - 1) * limit);
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