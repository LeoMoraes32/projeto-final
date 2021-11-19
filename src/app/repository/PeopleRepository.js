const PeopleSchema = require('../schema/PeopleSchema');
const Repository = require('./Repository');

class PeopleRepository extends Repository {
  constructor(){
    super(PeopleSchema);
  }
  async findOne({ email, senha }) {
    return PeopleSchema.findOne({ email, senha });
  }

  async findPeopleByEmail(email) {
    return PeopleSchema.findOne({ email });
  }
}
module.exports = new PeopleRepository();
