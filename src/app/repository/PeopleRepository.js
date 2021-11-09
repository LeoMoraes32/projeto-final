const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
    async create(payload){
        return await PeopleSchema.create(payload);
      
    }
    async list(payload){
        return await PeopleSchema.paginate(payload, {
            page: payload.page || 1,
            limit: 100
        });
    }

    async listById(payload){
        return await PeopleSchema.findById(payload);
    }

    async updateById(payload, body){
        return await PeopleSchema.findByIdAndUpdate(payload, body, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(payload){
        return await PeopleSchema.findByIdAndDelete(payload);
    }

    async findOne({ email, senha }){
        return await PeopleSchema.findOne({ email, senha });
    }
}
module.exports = new PeopleRepository();