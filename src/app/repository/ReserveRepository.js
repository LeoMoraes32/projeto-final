const ReserveSchema = require('../schema/ReserveSchema');
const Repository = require('../')

class ReserveRepository extends Repository{
  constructor(){
    super(ReserveSchema);
  }
}
module.exports = new ReserveRepository();