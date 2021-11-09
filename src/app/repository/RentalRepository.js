const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
    async create(payload){
        return await RentalSchema.create(payload);
    }

    async list(payload){
        return await RentalSchema.paginate(payload, {
            page: payload.page || 1,
            limit: 100
        })
    }

    async listById(payload){
        return await RentalSchema.findById(payload);
    }

    async updateById(payload, body){
        return await RentalSchema.findByIdAndUpdate(payload, body, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(payload){
        return await RentalSchema.findByIdAndDelete(payload);
    }
}
module.exports = new RentalRepository();