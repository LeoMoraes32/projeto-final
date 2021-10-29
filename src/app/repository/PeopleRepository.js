const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
    async create(payload){
        return PeopleSchema.create(payload);
      
    }
    async list(payload, offset, limit){
        
        offset = parseInt(offset) || 0;
        limit = parseInt(limit) || 100;

        return PeopleSchema.paginate(payload, {offset, limit});
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