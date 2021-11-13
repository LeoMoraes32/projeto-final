const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
  async create(payload) {
    return PeopleSchema.create(payload);
  }

  async list(payload) {
    const { page = 1, limit = 100, ...query } = payload;
    return PeopleSchema.paginate(
      { ...query },
      { limit: Number(limit), page: Number(page), skip: (Number(page) - 1) * Number(limit) }
    );
  }

  async getById(payload) {
    return PeopleSchema.findById(payload);
  }

  async updateById(payload, body) {
    return PeopleSchema.findByIdAndUpdate(payload, body, {
      new: true,
      runValidators: true
    });
  }

  async deleteById(payload) {
    return PeopleSchema.deleteOne({ _id: payload });
  }

  async findOne({ email, senha }) {
    return PeopleSchema.findOne({ email, senha });
  }

  async findPeopleByEmail(email) {
    return PeopleSchema.findOne({ email });
  }
}
module.exports = new PeopleRepository();
