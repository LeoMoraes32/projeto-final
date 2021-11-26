const { paginateSerialize, serialize } = require('../serialize/ReserveSerialize');
const ReserveService = require('../service/ReserveService');

class ReserveController {
  async create(req, res) {
    try {
      const { idRental } = req.params;
      const result = await ReserveService.create(idRental, req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ description: error.description, name: error.message });
    }
  }

  async list(req, res) {
    try {
      const result = await ReserveService.list(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async getById(req, res) {
    try {
      const result = await ReserveService.getById(req.params.id);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await ReserveService.updateById(req.params.id, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async delete(req, res) {
    try {
      await ReserveService.deleteById(req.params.id);
      return res.status(204).json({});
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }
}

module.exports = new ReserveController();
