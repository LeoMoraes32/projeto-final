const moment = require('moment');
const ReserveRepository = require('../repository/ReserveRepository');
const AgeUnderEighteen = require('../errors/peopleError/AgeUnderEighteen');
const UniqueCpf = require('../errors/peopleError/UniqueCpf');
const UniqueEmail = require('../errors/peopleError/UniqueEmail');
const IdNotFound = require('../errors/peopleError/IdNotFound');
const ValidCpf = require('../utils/ValidCpf');
const RentalRepository = require('../repository/RentalRepository');

class ReserveService {
  async create(id, payload) {
    const rental = await RentalRepository.getById(id);
    if (!rental) throw new Error();
    const result = await ReserveRepository.create(payload);
    if (!result) throw new Error();
    return result;
  }

  async list(payload) {
    const result = await ReserveRepository.list(payload);
    if (!result) throw new Error();
    return result;
  }

  async getById(payload) {
    const result = await ReserveRepository.getById(payload);
    if (!result) throw new IdNotFound(payload);
    return result;
  }

  async updateById(payload, body) {
    if (body.cpf) await ValidCpf.verifyCpf(payload.cpf);
    const result = await ReserveRepository.updateById(payload, body);
    if (!result) throw new IdNotFound(payload);
    return result;
  }

  async deleteById(payload) {
    const result = await ReserveRepository.deleteById(payload);
    if (!result) throw new IdNotFound(payload);
    return result;
  }
}

module.exports = new ReserveService();
