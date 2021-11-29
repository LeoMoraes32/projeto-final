const IdNotFound = require('../errors/peopleError/IdNotFound');
const FleetRepository = require('../repository/FleetRepository');
const RentalRepository = require('../repository/RentalRepository');

class FleetService {
  async create(id, payload) {
    const rental = await RentalRepository.getById(id);
    if (!rental) throw new Error('Id of rental dont exist');
    const result = await FleetRepository.create(payload);
    if (!result) throw new Error();
    return result;
  }

  async list(payload) {
    const result = await FleetRepository.list(payload);
    if (!result) throw new Error();
    return result;
  }

  async getById(id, payload) {
    const rental = await RentalRepository.getById(id);
    if (!rental) throw new Error('Id of rental dont exist')
    const result = await FleetRepository.getById(payload);
    if (!result) throw new IdNotFound(payload);
    return result;
  }

  async updateById(idRental, id, payload) {
    const rental = await RentalRepository.getById(idRental);
    if (!rental) throw new Error('Id of rental dont exist');
    const result = await FleetRepository.updateById(id, payload);
    if (!result) throw new IdNotFound(id);
    return result;
  }

  async deleteById(id, payload) {
    const rental = await RentalRepository.getById(id);
    if (!rental) throw new Error('Id of rental dont exist');
    const result = await FleetRepository.deleteById(payload);
    if (!result) throw new IdNotFound(payload);
    return result;
  }
}

module.exports = new FleetService();
