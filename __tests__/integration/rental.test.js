const request = require('supertest');
const app = require('../../src/app');
const Rental = require('../../src/app/schema/RentalSchema');

beforeAll(async () => {
  await Rental.deleteMany();
});

beforeEach(async () => {
  await Rental.deleteMany();
});

describe('Create a new rental', () => {
  it('should create a remtal and return status 201', async () => {
    const rental = {
      nome: 'Localiza Rent a Car',
      cnpj: '64.646.687/0001-10',
      atividades: 'vender',
      endereco: [
        {
          cep: '60765-190',
          number: '232',
          isFilial: false
        }
      ]
    };
    const response = await request(app).post('/api/v1/rental').send(rental);
    const { body } = response;
    const { status } = response;
    expect(body.atividades).toBe('vender');
    expect(status).toBe(201);
  });
});
