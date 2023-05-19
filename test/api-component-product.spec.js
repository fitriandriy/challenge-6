const supertest = require('supertest');
const app = require('../app');
const truncate = require('../utils/truncate');
const init_data = require('../utils/init-data');

truncate.destroyComponentProduct();
truncate.destroyProduct();
truncate.destroyComponent();
init_data.insertComponent();
init_data.insertProduct();

const componentProductData = {
  component_id: 1,
  product_id: 2
};

// POST
describe('POST /component_products', () => {
  test('201: component_products created', async () => {
    try {
      const res = await supertest(app)
        .post('/component_products')
        .send(componentProductData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('component_id');
      expect(res.body.data).toHaveProperty('product_id');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('400: componentProduct already exist', async () => {
    try {
      const res = await supertest(app)
        .post('/component_products')
        .send(componentProductData);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`data already exists.`);
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('404: product or component not found', async () => {
    try {
      const res = await supertest(app)
        .post('/component_products')
        .send({
          component_id: 10,
          product_id: 10
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("product or component not found.");
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})


// GET
describe('GET /component_products', () => {
  // positive case
  test('200: GET data success', async () => {
    try {
      const res = await supertest(app)
        .get('/component_products');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data[0]).toHaveProperty('component_id');
      expect(res.body.data[0]).toHaveProperty('product_id');
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
describe('GET /component_products/:id', () => {
  // positive case
  test('200: GET data success', async () => {
    try {
      const res = await supertest(app)
        .get('/component_products/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('component_id');
      expect(res.body.data).toHaveProperty('product_id');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
    } catch (error) {
      expect(error).toBe('error');
    }
  })

  test('404: componentProduct not found', async () => {
    try {
      const res = await supertest(app)
        .get('/component_products/10');

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
describe('PUT /component_products/id', () => {
  // positive case
  test('201: componentProduct updated', async () => {
    try {
      const res = await supertest(app)
        .put('/component_products/1')
        .send({
          component_id: 1,
          product_id: 1
        });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.message).toBe('success');
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('404: component or product not found', async () => {
    try {
      const res = await supertest(app)
        .put('/component_products/1')
        .send({
          component_id: 10,
          product_id: 10
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("product or component not found.");
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})


// DELETE
describe('DELETE /component_products/id', () => {
  // positive case
  test('200: componentProduct deleted', async () => {
    try {
      const res = await supertest(app)
        .delete('/component_products/1');

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

  test('404: componentProduct not found', async () => {
    try {
      const res = await supertest(app)
        .delete('/component_products/10');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("data with id 10 is not found");
      expect(res.body.data).toBe(0);
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})