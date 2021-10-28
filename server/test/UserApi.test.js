const request = require('supertest');
const server = require('../server');
const db = require('../models/index');

const { User: UserModel } = db.models;

describe('registration route', () => {
  test('Succesfull registration', async () => {
    const response = await request(server.listener).post('/registration').send({
      nickname: 'Dima',
      email: 'adam@gmail.com',
      password: 'Hello76',
    });

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );

    // clear up the database
    await UserModel.destroy({
      where: {
        nickname: 'Dima',
      },
    });
  });

  test('Unsuccesfull registration due to the invalid request payload for email (Joi validation)', async () => {
    const response = await request(server.listener).post('/registration').send({
      nickname: 'Dima',
      email: 'adam##12(8sdfsdf@gmail.com',
      password: 'Hello76',
    });

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Invalid request payload input');
  });

  test('Unsuccesfull registration due to the use of the already used by somebody nickname', async () => {
    const response = await request(server.listener).post('/registration').send({
      nickname: 'Nino',
      email: 'adam3@gmail.com',
      password: 'Hello765',
    });

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toBe('Such nickname or email already taken!');
  });
});

describe('login route', () => {
  test('Succesfull login', async () => {
    const response = await request(server.listener).post('/login').send({
      email: 'nino@gmail.com',
      password: 'NinoFromBorgo8',
    });

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });

  test('Unsuccesfull login due to the invalid request payload for email (Joi validation)', async () => {
    const response = await request(server.listener).post('/login').send({
      email: 'adam##12(8sdfsdf@gmail.com',
      password: 'Hello76',
    });

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Invalid request payload input');
  });

  test('Unsuccesfull login due to the wrong credentials', async () => {
    const response = await request(server.listener).post('/login').send({
      email: 'ada@gmail.com',
      password: 'Hellosdfsd76',
    });

    expect(response.statusCode).toBe(401);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Email or password is wrong!');
  });
});

describe('getAllUsers route', () => {
  test('Succesfully receive all users', async () => {
    const response = await request(server.listener).get('/users');

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          nickname: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
        }),
      ])
    );
  });
});

describe('getUserById route', () => {
  test('Succesfully receive user', async () => {
    const response = await request(server.listener).get('/user/1');

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nickname: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
      })
    );
  });

  test('get error response due to the wrong id parameter in the route(joi)', async () => {
    const response = await request(server.listener).get('/user/h');

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Invalid request params input');
  });

  test('Get error due to the wrong id', async () => {
    const response = await request(server.listener).get('/user/9');

    console.log(response);

    expect(response.statusCode).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe("User with such id wasn't found!");
  });
});

describe('updateUserPassword route', () => {
  test('Succesfully update user password', async () => {
    const response = await request(server.listener).put('/user/1').send({
      password: 'NicoloRome78',
    });

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toBe('User password succesfully updated!');
  });

  test('get error response due to the wrong id parameter in the route(joi)', async () => {
    const response = await request(server.listener).put('/user/hs').send({
      password: 'NicoloRome78',
    });

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Invalid request params input');
  });

  test('get error resposne due to the invalid password(joi)', async () => {
    const response = await request(server.listener).put('/user/hs').send({
      password: 'niocnlkjl435',
    });

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Invalid request params input');
  });

  test('get error due to the wrong id', async () => {
    const response = await request(server.listener).put('/user/6').send({
      password: 'NicoloRome78',
    });

    expect(response.statusCode).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe("User with such id wasn't found!");
  });
});

describe('deleteUser route', () => {
  test('Succesfully delete user', async () => {
    // add user first
    await UserModel.create({
      id: 7,
      nickname: 'Dimsudfnsd',
      email: 'asdfs@gmail.com',
      password: '$2a$12$TRKTzd/Pij/Sx5iDt0yIVOyhV4ws1WNNfhjpKfxV3J9QtKPN/wwsC',
    }).catch((err) => {
      console.log(err);
    });

    const response = await request(server.listener).delete('/user/7');

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toBe('User succesfully deleted!');
  });

  test('get error response due to the invalid route params(joi)', async () => {
    const response = await request(server.listener).delete('/user/hs');

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Invalid request params input');
  });

  test('get error due to the wrong id', async () => {
    const response = await request(server.listener).put('/user/6').send({
      password: 'NicoloRome78',
    });

    expect(response.statusCode).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe("User with such id wasn't found!");
  });
});
