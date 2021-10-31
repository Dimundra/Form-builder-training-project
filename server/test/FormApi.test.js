const request = require('supertest');
const server = require('../server');
const db = require('../models/index');

const { Form: FormModel } = db.models;

describe('addNewForm route', () => {
  test('Succesfully add new form', async () => {
    const response = await request(server.listener)
      .post('/form')
      .send({
        name: 'Christmas',
        data: { organiser: 'John' },
        user_id: 1,
      });

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toBe('Form successfully added!');

    // delete form
    await FormModel.destroy({
      where: {
        name: 'Christmas',
      },
    });
  });

  test('Get error due to the invalid payload(joi)', async () => {
    const response = await request(server.listener).post('/form').send({
      name: 'Christmas',
      data: 'sdfsl',
      user_id: 1,
    });

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Invalid request payload input');
  });

  test('Get error due to the use of the already used by somebody name', async () => {
    const response = await request(server.listener)
      .post('/form')
      .send({
        name: 'Birthdays',
        data: { organiser: 'John' },
        user_id: 1,
      });

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toBe(
      'Form with such name alredy exists, please choose another name for your form!'
    );
  });

  test('Get error due to the db error', async () => {
    const mock = jest
      .spyOn(db.models.Form, 'findOne')
      .mockImplementation(async () => Promise.reject('Db error!'));

    const response = await request(server.listener)
      .post('/form')
      .send({
        name: 'Christmas',
        data: { organiser: 'John' },
        user_id: 1,
      });

    expect(response.statusCode).toBe(500);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Sorry, server is down!');

    mock.mockRestore();
  });
});

describe('getAllForms route', () => {
  test('Succesfully receive all forms', async () => {
    const response = await request(server.listener).get('/forms');

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          data: expect.any(Object),
          user_id: expect.any(Number),
        }),
      ])
    );
  });

  test('Get eror due to the db error', async () => {
    const mock = jest
      .spyOn(db.models.Form, 'findAll')
      .mockImplementation(async () => Promise.reject('DB error!'));

    const response = await request(server.listener).get('/forms');

    expect(response.statusCode).toBe(500);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe(
      'Sorry, cannot get forms! Error occured!'
    );

    mock.mockRestore();
  });
});

describe('getFormById route', () => {
  test('Succesfully receive the required form', async () => {
    const response = await request(server.listener).get('/form/1');

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        data: expect.any(Object),
        user_id: expect.any(Number),
      })
    );
  });

  test('Get error response due to the wrong id parameter in the route(joi)', async () => {
    const response = await request(server.listener).get('/form/h');

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Invalid request params input');
  });

  test('Get error due to the unexisting id', async () => {
    const response = await request(server.listener).get('/form/9');

    expect(response.statusCode).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe("Form with such id wasn't found!");
  });

  test('Get error due to the db error', async () => {
    const mock = jest
      .spyOn(db.models.Form, 'findByPk')
      .mockImplementation(async () => Promise.reject('DB error!'));

    const response = await request(server.listener).get('/form/1');

    expect(response.statusCode).toBe(500);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe(
      'Sorry, cannot get required form! Error occured!'
    );

    mock.mockRestore();
  });
});

describe('updateFormHandler route', () => {
  test('Succesfully update form', async () => {
    const response = await request(server.listener)
      .put('/form/1')
      .send({
        name: 'Halloween',
        data: {
          organiser: 'Johann',
        },
        user_id: 1,
      });

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toBe('Form successfully updated!');
  });

  test('Get error due to the wrong id parameter in the route(joi)', async () => {
    const response = await request(server.listener)
      .put('/form/h')
      .send({
        name: 'Halloween',
        data: {
          organiser: 'Johann',
        },
        user_id: 1,
      });

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Invalid request params input');
  });

  test('Get error resposne due to the invalid payload(joi)', async () => {
    const response = await request(server.listener).put('/user/hs').send({
      password: 'niocnlkjl435',
    });

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Invalid request params input');
  });

  test('Get error due to the invalid payload(joi)', async () => {
    const response = await request(server.listener).put('/form/1').send({
      name: 'Halloween',
      data: '',
      user_id: 1,
    });

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Invalid request payload input');
  });

  test('get error due to the unexisting id', async () => {
    const response = await request(server.listener)
      .put('/form/9')
      .send({
        name: 'Halloween',
        data: {
          organiser: 'Johann',
        },
        user_id: 1,
      });

    expect(response.statusCode).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe("Form with such id wasn't found!");
  });

  test('Get error due to the db error', async () => {
    const mock = jest
      .spyOn(db.models.Form, 'update')
      .mockImplementation(async () => Promise.reject('DB error!'));

    const response = await request(server.listener)
      .put('/form/9')
      .send({
        name: 'Halloween',
        data: {
          organiser: 'Johann',
        },
        user_id: 1,
      });

    expect(response.statusCode).toBe(500);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe(
      'Sorry, cannot update the form! Error occured!'
    );

    mock.mockRestore();
  });
});

describe('deleteForm route', () => {
  test('Succesfully delete form', async () => {
    // add user first
    await FormModel.create({
      id: 7,
      name: 'Holiday',
      data: {
        organiser: 'Johann',
      },
      user_id: 1,
    });

    const response = await request(server.listener).delete('/form/7');

    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('text/html');
    expect(response.text).toBe('Form succesfully deleted!');
  });

  test('Get error response due to the invalid route params(joi)', async () => {
    const response = await request(server.listener).delete('/form/hs');

    expect(response.statusCode).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe('Invalid request params input');
  });

  test('Get error due to the unexisting id', async () => {
    const response = await request(server.listener).delete('/form/6');

    expect(response.statusCode).toBe(404);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe("Form with such id wasn't found!");
  });

  test('Get error due to the db error', async () => {
    const mock = jest
      .spyOn(db.models.Form, 'destroy')
      .mockImplementation(async () => Promise.reject('DB error!'));

    const response = await request(server.listener).delete('/form/1');

    expect(response.statusCode).toBe(500);
    expect(response.type).toBe('application/json');
    expect(response.body.message).toBe(
      'Sorry, cannot delete the form! Error occured!'
    );

    mock.mockRestore();
  });
});
