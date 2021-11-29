const request = require('supertest');
const app = require('../../../src/app');

let token = '';
let peopleMock = {};

describe('Create new car', () => {
  beforeEach(() => {
    peopleMock = PeopleDataFaker();
    await request(app).post('/api/v1/people/').send(peopleMock);
    const result = await request(app).post('/api/v1/authenticate/').send({ email: peopleMock.email, senha: peopleMock.senha });
    const { body } = result;
    token = body.token;
  });
  let carMock;
  it('should return status code 201', async () => {
    
  });
});
    
  
