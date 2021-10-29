const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
    async create(payload){
        return PeopleSchema.create(payload);
      
    }
    async list(perPage, page){
    
        const options = {
            page: parseInt(page, 10) || 1,
            limit: parseInt(perPage, 10) || 10,
        };
        return PeopleSchema.paginate({}, options);
    }
    
    async listByParams(payload){
        return PeopleSchema.find(payload);
    }

    async listById(payload){
        return PeopleSchema.findById(payload);
    }

    async updateById(payload, body){
        return PeopleSchema.findByIdAndUpdate(payload, body, {
            new: true,
            runValidators: true
        });
    }

    async deleteById(payload){
        return PeopleSchema.findByIdAndDelete(payload);
    }

    async findOne({ email, senha }){
        return PeopleSchema.findOne({ email, senha });
    }
}
module.exports = new PeopleRepository();