class Repository {
  constructor(schema) {
    this.schema = schema;
  };

  async create(payload) {
    return this.schema.create(payload);
  }

  async list(payload) {
    const { page = 1, limit = 100, ...query } = payload;
    return this.schema.paginate(
      { ...query },
      { limit: Number(limit), page: Number(page), skip: (Number(page) - 1) * Number(limit) }
    );
  }

  async deleteById(payload) {
    return this.schema.findByIdAndDelete(payload);
  }

  async getById(payload) {
    return this.schema.findById(payload);
  }

  async updateById(payload, body) {
    return this.schema.findByIdAndUpdate(payload, body, {
      new: true,
      runValidators: true
    });
  }

}
module.exports = Repository;
