const request = require('supertest');
const app = require('../../../src/app');
const Car = require('../../../src/app/schema/CarSchema');

beforeAll(async () => {
  await Car.deleteMany();
});

beforeEach(async () => {
  await Car.deleteMany();
});

describe('Create a new car', () => {
  it('should create a car and return status 201', async () => {
    const car = {
      modelo: 'BMW M2',
      cor: 'Azul',
      ano: '2005',
      acessorios: [
        {
          descricao: 'ABS'
        }
      ],
      quantidadePassageiros: 5
    };
    const response = await request(app).post('/api/v1/car').send(car);
    const { body } = response;
    const { status } = response;
    expect(body.modelo).toBe('BMW M2');
    expect(status).toBe(201);
  });
});

describe('Get all cars', () => {
  it('should get all car and return status 200', async () => {
    const car = {
      modelo: 'BMW M2',
      cor: 'Azul',
      ano: '2005',
      acessorios: [
        {
          descricao: 'ABS'
        }
      ],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car').send(car);
    const response = await request(app).get('/api/v1/car/');
    const { body } = response;
    const { status } = response;
    const { veiculos } = body;
    const carAno = car.ano.toString();
    console.log(carAno);
    expect(veiculos[0].modelo).toBe(car.modelo);
    expect(veiculos[0].cor).toBe(car.cor);
    expect(carAno).toBe(car.ano);
    expect(veiculos[0].acessorios.descricao).toBe(car.acessorios.descricao);
    expect(veiculos[0].quantidadePassageiros).toBe(car.quantidadePassageiros);
    expect(status).toBe(200);
  });
});

describe('Delete car by id', () => {
  it('should delete car by Id', async () => {
    const car = {
      modelo: 'BMW M2',
      cor: 'Azul',
      ano: '2005',
      acessorios: [
        {
          descricao: 'ABS'
        }
      ],
      quantidadePassageiros: 5
    };
    const { text } = await request(app).post('/api/v1/car/').send(car);

    const { _id } = JSON.parse(text);

    const response = await request(app).delete(`/api/v1/car/${_id.toString()}`);
    const { status } = response;
    expect(status).toBe(204);
  });
});
