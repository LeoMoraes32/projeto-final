const request = require('supertest');
const { PeopleDataFaker } = require('../../support/datafaker');

const app = require('../../../src/app');

let people = {};
let peopleNew = {};
let peopleMock = {};

describe('Update people', () => {
  beforeEach(() => {
    people = {
      nome: 'Leonardo Moraes',
      cpf: '035.409.060-70',
      data_nascimento: '15/12/1994',
      email: 'leonardo32moraes@hotmail.com',
      senha: '123456789',
      habilitado: 'sim'
    };
    peopleNew = {
      nome: 'Leonardo Moraes',
      cpf: '034.798.320-08',
      data_nascimento: '15/12/1994',
      email: 'leonardo32moraes@hotmail.com',
      senha: '123456789',
      habilitado: 'sim'
    };
  });
  it('should return status code 200', async () => {
    const { text } = await request(app).post('/api/v1/people/').send(people);
    const { _id } = JSON.parse(text);

    const { status } = await request(app).put(`/api/v1/people/${_id.toString()}`).send(peopleNew);
    expect(status).toBe(200);
  });
});
describe('Do not update a people with id that do not exist', () => {
  const id = '619baafaa76ea9eeae6033de';
  it('should return status code 400 and description and name of error', async () => {
    const result = await request(app).patch(`/api/v1/people/${id}`).send(people);
    const { body } = result;
    const { status } = result;
    expect(body.description).toBe('Not found');
    expect(body.name).toBe('Id 619baafaa76ea9eeae6033de not found');
    expect(status).toBe(400);
  });
});
describe('Do not update a people with password less than 6', () => {
  let senha;
  beforeEach(() => {
    peopleMock = PeopleDataFaker();
    senha = '12345';
  });
  it('should return status code 400', async () => {
    const { text } = await request(app).post('/api/v1/people/').send(peopleMock);
    const { _id } = JSON.parse(text);

    const { status, body } = await request(app).patch(`/api/v1/people/${_id.toString()}`).send({ senha });
    const { details } = body;
    expect(details[0].message).toBe('\"senha\" length must be at least 6 characters long');
    expect(status).toBe(400); 
  });
});
