const CarSchema = require('../schema/CarSchema');

class CarRepository {
    async create(payload){
        return CarSchema.create(payload);
    }
    async list(perPage, page, query){

        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
        };

        return CarSchema.paginate(query, options);
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