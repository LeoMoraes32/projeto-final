const request = require('supertest');
const { PeopleDataFaker } = require('../../support/datafaker');
const app = require('../../../src/app');

let peopleMock = {};

describe('Create new people', () => {
  beforeEach(() => {
    peopleMock = PeopleDataFaker();
  });

  it('should return status code 201', async () => {
    const { status } = await request(app).post('/api/v1/people/').send(peopleMock);
    expect(status).toBe(201);
  });

  it('should return a _id and the peopleMock with every value entered', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(peopleMock);

    expect(body).toHaveProperty('_id');
    expect(body.nome).toBe(peopleMock.nome);
    expect(body.cpf).toBe(peopleMock.cpf);
    expect(body.data_nascimento).toBe(peopleMock.data_nascimento);
    expect(body.email).toBe(peopleMock.email);
    expect(body.habilitado).toBe(peopleMock.habilitado);
  });
});

describe('Do not create people with cpf of format wrong', () => {
  beforeEach(() => {
    peopleMock = PeopleDataFaker();
    peopleMock.cpf = '034798.320-08';
  });
  it('should return status code 400 and the error with description and name', async () => {
    const result = await request(app).post('/api/v1/people/').send(peopleMock);
    const { body } = result;
    const { status } = result;
    expect(body[0].description).toMatch(/\"cpf\" with value \"034798.320-08\" fails to match the required pattern:/);
    expect(body[0].name).toBe('cpf');
    expect(status).toBe(400);
  });
});

describe('Do not create a people with the same cpf', () => {
  const peopleMockcpf = {
    nome: 'Amanda Scholant',
    cpf: '035.409.060-70',
    data_nascimento: '14/06/1995',
    email: 'amanda@hotmail.com',
    senha: '123456789',
    habilitad: 'sim'
  };

  const peopleMockcpf2 = {
    nome: 'Amanda Scholant',
    cpf: '035.409.060-70',
    data_nascimento: '14/06/1995',
    email: 'amanda@hotmail.com',
    senha: '123456789',
    habilitad: 'sim'
  };

  it('should return status code 400 with the same cpf entered', async () => {
    await request(app).post('/api/v1/people/').send(peopleMockcpf);
    const result = await request(app).post('/api/v1/people/').send(peopleMockcpf2);
    expect(result.status).toBe(400);
  });
});

describe('Do not create a people with the same email', () => {
  const people = {
    nome: 'Leonardo Moraes',
    cpf: '035.409.060-70',
    data_nascimento: '15/12/1994',
    email: 'leonardo32moraes@hotmail.com',
    senha: '123456789',
    habilitado: 'sim'
  };

  const peopleCopy = {
    nome: 'Leonardo Moraes',
    cpf: '034.798.320-08',
    data_nascimento: '15/12/1994',
    email: 'leonardo32moraes@hotmail.com',
    senha: '123456789',
    habilitado: 'sim'
  };

  it('should return status code 400', async () => {
    await request(app).post('/api/v1/people/').send(people);
    const result = await request(app).post('/api/v1/people/').send(peopleCopy);
    expect(result.status).toBe(409);
  });
});

describe('Do not create a people with a wrong email format', () => {
  beforeEach(() => {
    peopleMock = PeopleDataFaker();
    peopleMock.email = 'leonardo32moraes';
  });
  it('should return status code 400', async () => {
    const { status } = await request(app).post('/api/v1/people/').send(peopleMock);
    expect(status).toBe(400);
  });
  it('should return description and name of the error', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(peopleMock);

    expect(body[0].description).toBe('\"email\" must be a valid email');
    expect(body[0].name).toBe('email');
  });
});

describe('Do not create a people with empty field on a required property', () => {
  beforeEach(() => {
    peopleMock = PeopleDataFaker();
    peopleMock.name = '';
  });
  it('should return status code 400', async () => {
    const { status } = await request(app).post('/api/v1/people/').send(peopleMock);
    expect(status).toBe(400);
  });
  it('should return description and of the error', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(peopleMock);
    expect(body[0].description).toBe('\"name\" is not allowed');
    expect(body[0].name).toBe('name');
  });
});

