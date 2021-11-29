const { paginateSerialize, serialize } = require('../serialize/FleetSerialize');
const FleetService = require('../service/FleetService');

class FleetController {
  async create(req, res) {
    try {
      const { idRental } = req.params;
      const result = await FleetService.create(idRental, req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ description: error.description, name: error.message });
    }
  }

  async list(req, res) {
    try {
      const result = await FleetService.list(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { idRental } = req.params;
      const { idFleet } = req.params;
      const result = await FleetService.getById(idRental, idFleet);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async update(req, res) {
    try {
      const { idRental } = req.params;
      const { idFleet } = req.params;
      const result = await FleetService.updateById(idRental, idFleet, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { idRental } = req.params;
      const { idFleet } = req.params;
      await FleetService.deleteById(idRental, idFleet);
      return res.status(204).json({});
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }
}

module.exports = new FleetController();
