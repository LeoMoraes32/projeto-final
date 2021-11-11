class AgeUnderEighteen extends Error {
  constructor(nome, age) {
    super();
    this.statusCode = 400;
    this.description = 'idade';
    this.message = `User ${nome} is under age, the people have ${age} years`;
  }
}
module.exports = AgeUnderEighteen;
