const RentalRepository = require('../repository/RentalRepository');
const UniqueCnpj = require('../errors/rentalError/UniqueCnpj');
// const ValidCnpj = require('../utils/ValidCnpj');
const IdNotFound = require('../errors/peopleError/IdNotFound');

class RentalService {
  async create(payload) {
    // await ValidCnpj.verifyCnpj(payload.cnpj);
    //const cnpj = await RentalRepository.list(payload.cnpj);
    //console.log(cnpj);
    //if (!cnpj.docs.length) {
    //  throw new UniqueCnpj(cnpj.docs.cnpj);
    //}
    const result = await RentalRepository.create(payload);
    return result;
  }

  async list(payload) {
    const result = await RentalRepository.list(payload);
    if (!result) throw new Error();
    return result;
  }

  async getById(payload) {
    const result = await RentalRepository.getById(payload);
    if (!result) throw new IdNotFound(payload);
    return result;
  }

  async updateById(payload, body) {
    const result = await RentalRepository.updateById(payload, body);
    if (!result) throw new IdNotFound(payload);
    return result;
  }

  async deleteById(payload) {
    const result = await RentalRepository.deleteById(payload);
    if (!result) throw new IdNotFound(payload);
    return result;
  }
}

module.exports = new RentalService();
