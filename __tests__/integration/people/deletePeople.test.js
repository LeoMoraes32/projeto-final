const request = require('supertest');
const { PeopleDataFaker } = require('../../support/datafaker');

const app = require('../../../src/app');

let people = {};
let peopleNew = {};
let peopleMock = {};
let id;

describe('Delete people', () => {
  beforeEach(() => {
    peopleMock = PeopleDataFaker();
  });
  it('should delete people by id and return status code 204', async () => {
    const { text } = await request(app).post('/api/v1/people/').send(peopleMock);
    const { _id } = JSON.parse(text);
    const { status } = await request(app).delete(`/api/v1/people/${_id.toString()}`);
    expect(status).toBe(204);

  });
});
describe('Do not delete people that the id not exists', () => {
  const id = '619baafaa76ea9eeae6033de';
  it('should return status code 404 and description and name of the error', async () => {
    const { body, status } = await request(app).delete(`/api/v1/people/${id}`);
    expect(body.description).toBe('Not found');
    expect(body.name).toBe(`Id ${id} not found`);
    expect(status).toBe(404);
  });
});
describe('Do not delete people that the id length and format is wrong', () => {
  beforeEach(() => {
    id = '123';
  });
  it('should return status code 400 and description and name of the error', async ()=> {
    const { body, status } = await request(app).delete(`/api/v1/people/${id}`);
    expect(body[0].description).toBe('\"id\" length must be at least 24 characters long');
    expect(body[0].name).toBe('id')
    expect(status).toBe(400);
  })
});