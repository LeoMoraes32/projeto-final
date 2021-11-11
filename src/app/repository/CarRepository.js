const CarSchema = require('../schema/CarSchema');

class CarRepository {
  async create(payload) {
    return CarSchema.create(payload);
  }

  async list(payload) {
    return CarSchema.paginate(payload, {
      page: payload.page || 1,
      limit: 100
    });
  }

  async listById(payload) {
    return CarSchema.findById(payload);
  }

  async updateById(id, body) {
    return CarSchema.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
  }

  async patchAcessory(idAcessory, descricao) {
    const result = await CarSchema.findOneAndUpdate(
      { 'acessorios._id': idAcessory },
      {
        $set: {
          'acessorios.$.descricao': descricao
        }
      },
      { new: true, safe: true, upsert: true }
    );
    return result;
  }

  async deleteById(payload) {
    return CarSchema.findByIdAndDelete(payload);
  }
}
module.exports = new CarRepository();
