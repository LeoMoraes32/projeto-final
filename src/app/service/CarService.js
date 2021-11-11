const CarRepository = require('../repository/CarRepository');

const IdNotFoundCar = require('../errors/peopleError/IdNotFound');

class CarService {
  async create(payload) {
    const result = await CarRepository.create(payload);
    if (!result) throw Error();
    return result;
  }

  async list(payload) {
    const result = await CarRepository.list(payload);
    if (!result) throw new Error();
    return result;
  }

  async getById(payload) {
    const result = await CarRepository.getById(payload);
    if (!result) throw new IdNotFoundCar(payload);
    return result;
  }

  async updateById(id, body) {
    const result = await CarRepository.updateById(id, body);
    if (!result) throw new IdNotFoundCar(id);
    return result;
  }

  async patchAcessory({ id, idAcessory }, { descricao }) {
    const car = await CarRepository.listById(id);
    if (!car) throw new Error();

    const result = await CarRepository.patchAcessory(idAcessory, descricao);
    return result;
  }

  async deleteById(payload) {
    const result = await CarRepository.deleteById(payload);
    if (!result) throw new IdNotFoundCar(payload);
    return result;
  }
}

module.exports = new CarService();
