const request = require('supertest');
const { PeopleDataFaker } = require('../../support/datafaker');

const app = require('../../../src/app');

let peopleMock = {};

describe('Get all people', () => {
  beforeEach(() => {
    peopleMock = PeopleDataFaker();
  });
  
  it('should return status code 200', async () => {
    await request(app).post('/api/v1/people/').send(peopleMock);
    const { status } = await request(app).get('/api/v1/people/');
    expect(status).toBe(200);
  });
  it('should return the propertys of peopleMock and status code 200', async () => {
    await request(app).post('/api/v1/people/').send(peopleMock);
    const { body, status } = await request(app).get('/api/v1/people/');
    const { pessoas } = body;
    expect(pessoas).toHaveLength(1);
    expect(pessoas[0].nome).toBe(peopleMock.nome); 
    expect(pessoas[0].cpf).toBe(peopleMock.cpf);
    expect(pessoas[0].data_nascimento).toBe(peopleMock.data_nascimento);
    expect(pessoas[0].email).toBe(peopleMock.email);
    expect(pessoas[0].habilitado).toBe(peopleMock.habilitado);
    expect(status).toBe(200);
  });
});
describe('Get one people by id', () => {
  beforeAll(() => {
    peopleMock = PeopleDataFaker();
  });
  it('should return status code 200 and the people', async () => {
    const result = await request(app).post('/api/v1/people/').send(peopleMock);
    const { text } = result;
    const { _id } = JSON.parse(text);

    const people = await request(app).get(`/api/v1/people/${_id.toString()}`);
    const { body } = people;
    const { status } = people;
    expect(body).toHaveProperty('_id');
    expect(body.nome).toBe(peopleMock.nome);
    expect(body.cpf).toBe(peopleMock.cpf);
    expect(body.data_nascimento).toBe(peopleMock.data_nascimento);
    expect(body.email).toBe(peopleMock.email);
    expect(body.habilitado).toBe(peopleMock.habilitado);
    expect(status).toBe(200);
  });
});
describe('Do not get people by a wrong id', () => {
  beforeAll(() => {
    peopleMock = PeopleDataFaker();
  });
  it('should return status code 400', async () => {
    await request(app).post('/api/v1/people/').send(peopleMock);
    const id = '619baafaa76ea9eeae6033d';
    const { status } = await request(app).get(`/api/v1/people/${id}`);
    expect(status).toBe(400);
  });
  it('should return an error with description and name of the error', async () => {
    await request(app).post('/api/v1/people/').send(peopleMock);
    const id = '619baafaa76ea9eeae6033d';
    const { body } = await request(app).get(`/api/v1/people/${id}`);
    expect(body[0].description).toBe('\"id\" length must be at least 24 characters long');
    expect(body[0].name).toBe('id');
  });
});
describe('Get an empty object', () => {
  it('should give a empty object', async () => {
    const { pessoas } = await request(app).get('/api/v1/people/');
    expect(pessoas).toBeUndefined();
  });
})
  