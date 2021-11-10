const CarSchema = require('../schema/CarSchema');

class CarRepository {
    async create(payload){
        return await CarSchema.create(payload);
    }
    async list(payload){
        return await CarSchema.paginate(payload, {
            page: payload.page || 1,
            limit: 100
        });
    }

    async listById(payload){
        return await CarSchema.findById(payload);
    }

    async updateById(id, body){
        return await CarSchema.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true
        });
    }

    async patchAcessory(idAcessory, descricao){
        const result = await CarSchema.findOneAndUpdate(
            { 'acessorios._id': idAcessory },
            {
                $set: {
                    'acessorios.$.descricao': descricao
                }
            },
            { new: true, safe: true, upsert: true }
        )
        return result;
    }
      
    async deleteById(payload){
        return await CarSchema.findByIdAndDelete(payload);
    }
}
module.exports = new CarRepository();