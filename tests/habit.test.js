const request = require('supertest');
const app = require('../app');

describe('Habit API Tests', () => {

  // GET all habits
  test('GET /habits', async () => {
    const res = await request(app).get('/habits');
    expect(res.statusCode).toBe(200);
  });

  // ADD habit
  test('POST /habits', async () => {
    const res = await request(app)
      .post('/habits')
      .send({
        id: 100,
        name: "Reading",
        completed: false
      });

    expect(res.statusCode).toBe(200);
  });

  // DELETE habit
  test('DELETE /habits', async () => {
    const res = await request(app).delete('/habits/100');
    expect(res.statusCode).toBe(200);
  });

  // UPDATE habit
  test('PUT /habits', async () => {
    const res = await request(app)
      .put('/habits/1')
      .send({
        completed: true
      });

    expect(res.statusCode).toBe(200);
  });

});