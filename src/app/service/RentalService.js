const RentalRepository = require('../repository/RentalRepository');
const UniqueCnpj = require('../errors/rentalError/UniqueCnpj');

class RentalService {
  async create(payload) {
    const cnpj = await RentalRepository.list({ cnpj: payload.cnpj });
    if (!cnpj) {
      throw new UniqueCnpj(cnpj);
    }
    const result = await RentalRepository.create(payload);
    return result;
  }

  async list(payload) {
    try {
      const result = await RentalRepository.list(payload);
      return result;
    } catch (error) {
      return error;
    }
  }

  async getById(payload) {
    try {
      const result = await RentalRepository.getById(payload);
      return result;
    } catch (error) {
      return error;
    }
  }

  async updateById(payload, body) {
    try {
      const result = await RentalRepository.updateById(payload, body);
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteById(payload) {
    try {
      const result = await RentalRepository.deleteById(payload);
      if (!result) throw Error('Not found');
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new RentalService();
