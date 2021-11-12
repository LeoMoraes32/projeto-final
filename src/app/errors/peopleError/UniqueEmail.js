class UniqueEmail extends Error {
  constructor(email) {
    super();
    this.statusCode = 409;
    this.description = 'Conflict';
    this.message = `Email ${email} already in use`;
  }
}
module.exports = UniqueEmail;
