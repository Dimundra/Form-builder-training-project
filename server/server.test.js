const request = require('supertest');
const server = require('./server.js');

describe('Testing server', () => {
  test('server succesfully returning required react build on "/" path', async () => {
    const response = await request(server.listener).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('text/html');
  });

  test('server returning "404 not found" on random not defined "/hello-friend" path', async () => {
    const response = await request(server.listener).get('/hello-friend');
    expect(response.statusCode).toBe(404);
    expect(response.type).toBe('application/json');
  });
});
