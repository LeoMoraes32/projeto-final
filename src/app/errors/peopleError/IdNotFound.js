class IdNotFound extends Error {
  constructor(id) {
    super();
    this.statusCode = 404;
    this.description = 'Not found';
    this.message = `Id ${id} not found`;
  }
}
module.exports = IdNotFound;
