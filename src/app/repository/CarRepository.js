const CarSchema = require('../schema/CarSchema');

class CarRepository {
  async create(payload) {
    return CarSchema.create(payload);
  }

  async list(payload) {
    const { page = 1, limit = 100, ...query } = payload;
    return CarSchema.paginate(
      { ...query },
      { limit: Number(limit), page: Number(page), skip: (Number(page) - 1) * Number(limit) }
    );
  }

  async getById(payload) {
    return CarSchema.findById(payload);
  }

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

  async deleteById(payload) {
    return CarSchema.findByIdAndDelete(payload);
  }
}
module.exports = new CarRepository();
