import * as request from 'supertest';
import http = require('http');
describe('AppController (e2e)', () => {
  it('/ (GET)', async () => {
    return request(http)
      .get('/')
      .expect(200)
      .expect('Hello Worl!');
  });
});
