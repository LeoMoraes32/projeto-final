class UniqueCnpj extends Error {
  constructor(cnpj) {
    super();
    this.statusCode = 400;
    this.description = 'Conflict';
    this.message = `CNPJ ${cnpj} already in use`;
  }
}
module.exports = UniqueCnpj;
