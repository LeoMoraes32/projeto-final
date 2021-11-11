class UniqueEmail extends Error {
  constructor(email) {
    super();
    this.statusCode = 400;
    this.description = 'Conflict';
    this.message = `Email ${email} already in use`;
  }
}
module.exports = UniqueEmail;
