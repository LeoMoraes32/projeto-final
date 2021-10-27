const CarSchema = require('../schema/CarSchema');

class CarRepository {
    async create(payload){
        return CarSchema.create(payload);
    }
    async list(){
        return CarSchema.find();
    }

    async listById(payload){
        return CarSchema.findById(payload);
    }

    async listByParams(payload){
        return CarSchema.findOne({payload});
    }

    async updateById(payload, body){
        return CarSchema.findByIdAndUpdate(payload, body, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(payload){
        return CarSchema.findByIdAndDelete(payload);
    }
}
module.exports = new CarRepository();