const request = require('supertest');
const { PeopleDataFaker } = require('../../support/datafaker');
const app = require('../../../src/app');

let token = '';
let peopleMock = {};
let carMock = {};

beforeAll(async () => {
  peopleMock = PeopleDataFaker();
  await request(app).post('/api/v1/people/').send(peopleMock);
  const result = await request(app).post('/api/v1/authenticate/').send({ email: peopleMock.email, senha: peopleMock.senha });
  const { body } = result;
  token = body.token;
});

describe('Get all cars', () => {
  beforeAll(async () => {
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
    }
  });
  it('should return status code 200', async () => {
    await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(carMock);
    const { status } = await request(app).get('/api/v1/car/').set('Authorization',`Bearer ${token}`);
    expect(status).toBe(200);
  });
});

describe('Get car by color', () => {
  beforeEach(async () => {
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
    }
  });

  it('should return status code 200', async () => {
    await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(carMock);
    const { status } = await request(app).get(`/api/v1/car/?cor=${carMock.cor}`).set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
  });
});
describe('Get car by _id', () => {
  beforeEach(async () => {
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
    }
  });

  it('should return status code 200', async () => {
    const result = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(carMock);
    const { text } = result;
    const { _id } = JSON.parse(text);

    const { status } = await request(app).get(`/api/v1/car/${_id.toString()}`).set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
  });
});


