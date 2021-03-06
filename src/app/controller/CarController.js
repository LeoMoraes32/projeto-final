const { serialize, paginateSerialize } = require('../serialize/CarSerialize');
const CarService = require('../service/CarService');

class CarController {
  async create(req, res) {
    try {
      const result = await CarService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async list(req, res) {
    try {
      const result = await CarService.list(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async getById(req, res) {
    try {
      const result = await CarService.getById(req.params.id);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await CarService.updateById(req.params.id, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async patchAcessory(req, res) {
    try {
      const result = await CarService.patchAcessory(req.params.id, req.params.idAcessory, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async delete(req, res) {
    try {
      await CarService.deleteById(req.params.id);
      return res.status(204).json({});
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }
}

module.exports = new CarController();
