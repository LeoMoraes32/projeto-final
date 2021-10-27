const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
    async create(payload){
        return PeopleSchema.create(payload);
      
    }
    async list(){
        return PeopleSchema.find();
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
}
module.exports = new PeopleRepository();