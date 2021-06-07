import app from '../../server';
import supertest from 'supertest';
import { User, UserStore } from '../../models/user';
import Client from '../../database';

const request = supertest(app);

describe('Orders controller', () => {
  beforeAll(async () => {
    const userStore = new UserStore();
    const testUser: User = {
      username: 'testuser',
      firstName: 'Freddie',
      lastName: 'Mercury',
      password: 'queen123'
    };
    await userStore.create(testUser);
  });

  it('posts on /orders endpoint and returns an active order in JSON format', async () => {
    const response = await request.post('/orders').send({ userId: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      userId: 1,
      currentStatus: 'active'
    });
  });

  it('gets on /orders/users/:userId/active endpoint and returns an active order in JSON format', async () => {
    const response = await request.get('/orders/users/1/active');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      userId: 1,
      currentStatus: 'active'
    });
  });

  it('puts on /orders endpoint and returns a completed order in JSON format', async () => {
    const response = await request.put('/orders').send({ userId: 1 });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      userId: 1,
      currentStatus: 'complete'
    });
  });

  it('gets on /orders/users/:userId/completed endpoint and returns a list of completed orders in JSON format', async () => {
    const response = await request.get('/orders/users/1/completed');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        userId: 1,
        currentStatus: 'complete'
      }
    ]);
  });

  afterAll(async () => {
    const connection = await Client.connect();
    await connection.query('DELETE FROM users;');
    await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
    await connection.query('DELETE FROM orders;');
    await connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
    connection.release();
  });
});
