const supertest = require('supertest');
const app = require('../app');
const truncate = require('../utils/truncate');

truncate.destroyComponent();

const componentData = {
  name: "Lenovo A12345",
  description: "20 inch"
};

// POST
describe('POST /components', () => {
  // positive case
  test('201: component created', async () => {
    try {
      const res = await supertest(app)
        .post('/components')
        .send(componentData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data).toHaveProperty('description');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
      expect(res.body.data.name).toBe(componentData.name);
      expect(res.body.data.description).toBe(componentData.description);
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('400: component already exist', async () => {
    try {
      const res = await supertest(app)
        .post('/components')
        .send(componentData);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe('data already exists.');
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})


// GET
describe('GET /components', () => {
  // positive case
  test('200: GET data success', async () => {
    try {
      const res = await supertest(app)
        .get('/components');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data[0]).toHaveProperty('id');
      expect(res.body.data[0]).toHaveProperty('name');
      expect(res.body.data[0]).toHaveProperty('description');
      expect(res.body.data[0]).toHaveProperty('createdAt');
      expect(res.body.data[0]).toHaveProperty('updatedAt');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
    } catch (error) {
      expect(error).toBe('error');
    }
  })
})


// GET BY ID
describe('GET /components/:id', () => {
  // positive case
  test('200: GET data success', async () => {
    try {
      const res = await supertest(app)
        .get('/components/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data).toHaveProperty('description');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
    } catch (error) {
      expect(error).toBe('error');
    }
  })

  test('404: Component not found', async () => {
    try {
      const res = await supertest(app)
        .get('/components/10');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toBe(null);
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe('data not found');
    } catch (error) {
      expect(error).toBe('error');
    }
  })
})


// UPDATE
describe('PUT /components/id', () => {
  // positive case
  test('201: component updated', async () => {
    try {
      const res = await supertest(app)
        .put('/components/1')
        .send({
          description: '21 inch'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.message).toBe('success');
      expect(res.body.data[0]).toBe(1);
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('400: component with that name already exist', async () => {
    try {
      const res = await supertest(app)
        .put('/components/1')
        .send({
          name: componentData.name
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`product ${componentData.name} already exists.`);
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('404: component not found', async () => {
    try {
      const res = await supertest(app)
        .put('/components/10')
        .send({
          quantity: 15,
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("component with id 10 is not found");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})


// DELETE
describe('DELETE /components/id', () => {
  // positive case
  test('200: component deleted', async () => {
    try {
      const res = await supertest(app)
        .delete('/components/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
      expect(res.body.data).toBe(1);
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('404: component not found', async () => {
    try {
      const res = await supertest(app)
        .delete('/components/10');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("component with id 10 is not found");
      expect(res.body.data).toBe(0);
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})