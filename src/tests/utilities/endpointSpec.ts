import app from '../../Index';
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint response 200', async () => {
    const response = await request.get(
      '/api/pictures?filename=bridge&width=500&height=500',
    );
    expect(response.status).toBe(200);
  });
});
