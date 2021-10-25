const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
    async create(payload){
        return PeopleSchema.create(payload);
    }
    async list(payload){
        return PeopleSchema.find(payload);
    }
}
module.exports = new PeopleRepository();