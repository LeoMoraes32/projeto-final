const request = require('supertest');
const app = require('../../../src/app');
const People = require('../../../src/app/schema/PeopleSchema');
const { PeopleDataFaker } = require('../../support/datafaker');

const people = PeopleDataFaker();

const people = {
  nome: 'Leonardo',
  cpf: '034.798.320-08',
  data_nascimento: '15/12/1994',
  email: 'leonardo32moraes@hotmail.com',
  senha: '123456789',
  habilitado: 'sim'
};

const peopleWithoutAttribute = {
  nome: 'Amanda Scholant',
  cpf: '035.409.060-70',
  data_nascimento: '14/06/1995',
  email: 'amanda@hotmail.com',
  senha: '123456789'
};

const peopleUnderAge = {
  nome: 'Leonardo',
  cpf: '034.798.320-08',
  data_nascimento: '15/12/2010',
  email: 'leonardomoraes@hotmail.com',
  senha: '123456789',
  habilitado: 'sim'
};

const defaultErrors = (body) => {
  expect(body).toEqual({
    pessoas: expect.arrayContaining([
      {
        _id: expect.any(String),
        cpf: expect.any(String),
        nome: expect.any(String),
        data_nascimento: expect.any(String),
        email: expect.any(String),
        habilitado: expect.any(String)
      }
    ]),
    total: expect.any(Number),
    limit: expect.any(Number),
    offsets: expect.any(Number)
  });
};

const router = '/api/v1/people';

describe('Create a new people', () => {
  it('should create a new people and return status 201', async () => {
    const response = await request(app).post(router).send(people);
    const { body } = response;
    console.log(body);
    const { status } = response;
    expect(body.email).toBe(people.email);
    expect(status).toBe(201);
  });
});

describe('Create a new people without an attribute', () => {
  it('should return status 400 and the errors, if missing an attribute', async () => {
    const response = await request(app).post(router).send(peopleWithoutAttribute);
    const { body } = response;

    expect(response.status).toBe(400);
    defaultErrors(body);

    expect(body.nome).toBe(people.nome);
    expect(body.cpf).toBe(people.cpf);
    expect(body.data_nascimento).toBe(people.cpf);
    expect(body.email).toBe(people.email);
    expect(body[0].description).toBe(people.habilitado);
  });
});

describe('Get all people', () => {
  it('should get all people and return status 200', async () => {
    await request(app).post(router).send(people);
    const response = await request(app).get(router);
    const { body } = response;
    const { status } = response;
    const { pessoas } = body;
    expect(pessoas[0].nome).toBe(people.nome);
    expect(pessoas[0].cpf).toBe(people.cpf);
    expect(pessoas[0].data_nascimento).toBe(people.data_nascimento);
    expect(pessoas[0].email).toBe(people.email);
    expect(pessoas[0].habilitado).toBe(people.habilitado);
    expect(status).toBe(200);
  });
});

describe('Delete people by id', () => {
  it('should delete people by Id', async () => {
    const { text } = await request(app).post(router).send(people);
    const { _id } = JSON.parse(text);
    const response = await request(app).delete(`/api/v1/people/${_id.toString()}`);
    const { status } = response;
    expect(status).toBe(204);
  });
});

describe('Cannot post people under 18', () => {
  it('should not let people under 18 years be registered and it will return error 400', async () => {
    const response = await request(app).post(router).send(peopleUnderAge);
    const { status } = response;
    const { req } = response;
    console.log(req);
    expect(status).toBe(400);
  });
});
