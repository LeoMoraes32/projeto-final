const request = require('supertest');
const { PeopleDataFaker } = require('../../support/datafaker');
const app = require('../../../src/app');

let peopleMock = {};
let EmailSenha = {};

describe('Authenticate people with valid credentials', () => {
  beforeEach(async () => {
    peopleMock = PeopleDataFaker();
    await request(app).post('/api/v1/people/').send(peopleMock);
    EmailSenha = {
      email: peopleMock.email,
      senha: peopleMock.senha
    };
  });
  it('should return status code 200', async () => {
    const { status } = await request(app).post('/api/v1/authenticate/').send(EmailSenha);
    expect(status).toBe(201);
  });
});
describe('Do not authenticate people that not exist', () => {
  EmailSenha = {
    email: 'anotheremail@hotmail.com',
    senha: '123456another',
  };
  it('should return status code 400', async () => {
    const { status } = await request(app).post('/api/v1/authenticate/').send(EmailSenha);
    expect(status).toBe(400);
  });
});