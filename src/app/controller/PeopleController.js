const { paginateSerialize, serialize } = require('../serialize/PeopleSerialize');

const PeopleService = require('../service/PeopleService');

class PeopleController {
  async create(req, res) {
    try {
      const result = await PeopleService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async list(req, res) {
    try {
      const result = await PeopleService.list(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async getById(req, res) {
    try {
      const result = await PeopleService.getById(req.params.id);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }

  async update(req, res) {
    try {
      const result = await PeopleService.updateById(req.params.id, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ description: error.description, name: error.message });
    }
  }

  async delete(req, res) {
    try {
      await PeopleService.deleteById(req.params.id);
      return res.status(204).end();
    } catch (error) {
      return res.status(error.statusCode).json({ description: error.description, name: error.message });
    }
  }
}

module.exports = new PeopleController();
