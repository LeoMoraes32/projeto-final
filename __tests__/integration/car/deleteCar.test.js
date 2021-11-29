const request = require('supertest');
const { PeopleDataFaker } = require('../../support/datafaker');
const app = require('../../../src/app');

let token = '';
let peopleMock = {};
let carMock = {};

beforeAll(async () => {
  peopleMock = PeopleDataFaker();
  await request(app).post('/api/v1/people/').send(peopleMock);
  const result = await request(app)
    .post('/api/v1/authenticate/')
    .send({ email: peopleMock.email, senha: peopleMock.senha });
  const { body } = result;
  token = body.token;
});

describe('Delete a car', () => {
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
    };
  });
  it('should return status code 200', async () => {
    const { text } = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${token}`).send(carMock);
    const { _id } = JSON.parse(text);
    const { status } = await request(app)
      .delete(`/api/v1/car/${_id.toString()}`)
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(204);
  });
});
