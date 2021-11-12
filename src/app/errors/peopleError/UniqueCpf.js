class UniqueCpf extends Error {
  constructor(cpf) {
    super();
    this.statusCode = 409;
    this.description = 'Conflict';
    this.message = `CPF ${cpf} already in use`;
  }
}
module.exports = UniqueCpf;
