const FleetSchema = require('../schema/FleetSchema');
const Repository = require('./Repository');

class FleetRepository extends Repository{

  constructor(){
    super(FleetSchema);
  }

  async updateById(id, body) {
    return FleetSchema.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
  }

  async patchAcessory(_id, idAcessory, payload) {
    const result = await FleetSchema.findOneAndUpdate(
      { 'acessorios._id': idAcessory },
      {
        $set: {
          'acessorios.$.descricao': payload.descricao
        }
      },
      { new: true, safe: true, upsert: true }
    );
    return result;
  }


}
module.exports = new FleetRepository();
