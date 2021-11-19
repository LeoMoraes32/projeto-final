const CarSchema = require('../schema/CarSchema');
const Repository = require('./Repository');

class CarRepository extends Repository{

  async updateById(id, body) {
    return CarSchema.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
  }

  async patchAcessory(_id, idAcessory, payload) {
    const result = await CarSchema.findOneAndUpdate(
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
module.exports = new CarRepository(CarSchema);
