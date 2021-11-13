const request = require('supertest');
const app = require('../../src/app');
const People = require('../../src/app/schema/PeopleSchema');

beforeAll(async () => {
  await People.deleteMany();
});

beforeEach(async () => {
  await People.deleteMany();
});

describe('Create a new people', () => {
  it('should create a people and return status 201', async () => {
    const people = {
      nome: 'Leonardo',
      cpf: '034.798.320-08',
      data_nascimento: '15/12/1994',
      email: 'leonardo32moraes@hotmail.com',
      senha: '123456789',
      habilitado: 'sim'
    };
    const response = await request(app).post('/api/v1/people').send(people);
    const { body } = response;
    const { status } = response;
    expect(body.email).toBe('leonardo32moraes@hotmail.com');
    expect(status).toBe(201);
  });
});

describe('Get all people', () => {
  it('should get all people and return status 200', async () => {
    const people = {
      nome: 'Leonardo',
      cpf: '034.798.320-08',
      data_nascimento: '15/12/1994',
      email: 'leonardo32moraes@hotmail.com',
      senha: '123456789',
      habilitado: 'sim'
    };

    await request(app).post('/api/v1/people').send(people);
    const response = await request(app).get('/api/v1/people/');
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
      const people = {
        nome: 'Leonardo',
        cpf: '034.798.320-08',
        data_nascimento: '15/12/1994',
        email: 'leonardo32moraes@hotmail.com',
        senha: '123456789',
        habilitado: 'sim'
      };

      const { text } = await request(app).post('/api/v1/people/').send(people);
      
      const { _id } = JSON.parse(text);
      
      const response = await request(app).delete(`/api/v1/people/${_id.toString()}`);
      const { status } = response;
      expect(status).toBe(204);
    });
});

describe('Cannot post people under 18', () => {
  it('should not let people under 18 years be registered and it will return error 400', async () =>{
    const people = {
      nome: 'Leonardo',
      cpf: '034.798.320-08',
      data_nascimento: '15/12/2010',
      email: 'leonardo32moraes@hotmail.com',
      senha: '123456789',
      habilitado: 'sim'
    };

    const response = await request(app).post('/api/v1/people/').send(people);
    const { status } = response;
    const { req } = response;
    console.log(req);
    expect(status).toBe(400);
  });
});
