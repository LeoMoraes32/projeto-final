const request = require('supertest');
const { PeopleDataFaker } = require('../../support/datafaker');
const app = require('../../../src/app');

let token = '';
let peopleMock = {};
let carMock = {};
let newCarMock = {};
let carMock02 = {};

beforeAll(async () => {
  peopleMock = PeopleDataFaker();
  await request(app).post('/api/v1/people/').send(peopleMock);
  const result = await request(app).post('/api/v1/authenticate/').send({ email: peopleMock.email, senha: peopleMock.senha });
  const { body } = result;
  token = body.token;
});

describe('Update car', () => {
  beforeAll(() => {
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
    newCarMock = {
      modelo: 'BMW GT3',
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
  it('should return status code 200', async () => {
    const { text } = await request(app).post(`/api/v1/car/`).set('Authorization', `Bearer ${token}`).send(carMock);
    const { _id } = JSON.parse(text);
    const { status } = await request(app)
      .patch(`/api/v1/car/${_id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send(newCarMock);
    expect(status).toBe(200);
  });
});

describe('Do not update a car with id that do not exist', () => {
  const id = '619baafaa76ea9eeae6033de';
  it('should return status code 400 and description and name of error', async () => {
    const result = await request(app).patch(`/api/v1/car/${id}`).set('Authorization', `Bearer ${token}`).send(carMock);
    const { body } = result;
    const { status } = result;
    expect(body.description).toBe('Not found');
    expect(body.name).toBe('Id 619baafaa76ea9eeae6033de not found');
    expect(status).toBe(404);
  });
});

describe('Do not update a car without modelo', () => {
  beforeEach(() => {
    carMock02 = {
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
    const { text } = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(carMock);
    const { _id } = JSON.parse(text);
  
    const { status } = await request(app)
      .put(`/api/v1/car/${_id.toString()}`)
      .set('Authorization', `Bearer ${token}`)
      .send(carMock02);
    expect(status).toBe(400); 
  });
});
