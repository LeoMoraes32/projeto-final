const request = require('supertest');
const { PeopleDataFaker } = require('../../support/datafaker');
const app = require('../../../src/app');

let token = '';
let peopleMock = {};
let carMock = {};

describe('Create new car', () => {
  beforeAll(async () => {
    peopleMock = PeopleDataFaker();
    await request(app).post('/api/v1/people/').send(peopleMock);
    const result = await request(app).post('/api/v1/authenticate/').send({ email: peopleMock.email, senha: peopleMock.senha });
    const { body } = result;
    token = body.token;
  });
  
  it('should return status code 201', async () => {
    carMock = {
      modelo: 'BMW',
      cor: 'azul',
      ano: 2005,
      acessorios: [
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
    };
    const { status } = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(carMock);
    expect(status).toBe(201);
  });
  it('should return a _id and the carMock with every value entered', async () => {
    const { body } = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(carMock);

    expect(body).toHaveProperty('_id');
    expect(body.modelo).toBe(carMock.modelo);
    expect(body.cor).toBe(carMock.cor);
    expect(body.ano).toBe(carMock.ano);
    expect(body.acessorios[0].descricao).toBe(carMock.acessorios[0].descricao);
    expect(body.quantidadePassageiros).toBe(carMock.quantidadePassageiros);
  });
});

describe('Do not create a car with empty field on a required property', () => {
  beforeEach(async () => {
    carMock = {
      modelo: '',
      cor: 'azul',
      ano: 2005,
      acessorios: [
        {
          descricao: 'Ar-condicionado'
        }
      ],
      quantidadePassageiros: 5
    };
  });
  it('should return status code 400', async () => {
    const { status } = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(carMock);
    expect(status).toBe(400);
  });
});
    

