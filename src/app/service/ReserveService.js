const moment = require('moment');
const ReserveRepository = require('../repository/ReserveRepository');
const IdNotFound = require('../errors/peopleError/IdNotFound');
const RentalRepository = require('../repository/RentalRepository');
const { id } = require('../utils/regex');

class ReserveService {
  async create(id, payload) {
    const rental = await RentalRepository.getById(id);
    if (!rental) throw new Error('Id of rental dont exist');
    const result = await ReserveRepository.create(payload);
    if (!result) throw new Error('teste');
    return result;
  }

  async list(payload) {
    const result = await ReserveRepository.list(payload);
    if (!result) throw new Error();
    return result;
  }

  async getById(id, payload) {
    const rental = await RentalRepository.getById(id);
    if (!rental) throw new Error('Id of rental dont exist')
    const result = await ReserveRepository.getById(payload);
    if (!result) throw new IdNotFound(payload);
    return result;
  }

  async updateById(idRental, id, payload) {
    const rental = await RentalRepository.getById(idRental);
    if (!rental) throw new Error('Id of rental dont exist');
    const result = await ReserveRepository.updateById(id, payload);
    if (!result) throw new IdNotFound(id);
    return result;
  }

  async deleteById(id, payload) {
    const rental = await RentalRepository.getById(id);
    if (!rental) throw new Error('Id of rental dont exist');
    const result = await ReserveRepository.deleteById(payload);
    if (!result) throw new IdNotFound(payload);
    return result;
  }
}

module.exports = new ReserveService();
