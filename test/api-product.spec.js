const supertest = require('supertest');
const app = require('../app');
const truncate = require('../utils/truncate');
const init_data = require('../utils/init-data');
const client = require('../config/database');

truncate.destroyComponent();
truncate.destroyProduct();
init_data.insertComponent();

const productData = {
  name: "Lenovo A12345",
  quantity: 10,
  component_id: 1,
};

// POST
describe('POST /products', () => {
  // positive case
  test('201: product created', async () => {
    try {
      const res = await supertest(app)
        .post('/products')
        .send(productData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data).toHaveProperty('quantity');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
      expect(res.body.data.name).toBe(productData.name);
      expect(res.body.data.quantity).toBe(productData.quantity);
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('400: product already exist', async () => {
    try {
      const res = await supertest(app)
        .post('/products')
        .send(productData);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`product ${productData.name} already exists.`);
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('404: component not found', async () => {
    try {
      const res = await supertest(app)
        .post('/products')
        .send({
          name: `${productData.name}12`,
          quantity: productData.quantity,
          component_id: 5,
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("component with id 5 doesn't exist");
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})


// GET
describe('GET /products', () => {
  // positive case
  test('200: GET data success', async () => {
    try {
      const res = await supertest(app)
        .get('/products');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data[0]).toHaveProperty('id');
      expect(res.body.data[0]).toHaveProperty('name');
      expect(res.body.data[0]).toHaveProperty('quantity');
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
describe('GET /products/:id', () => {
  // positive case
  test('200: GET data success', async () => {
    try {
      const res = await supertest(app)
        .get('/products/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data).toHaveProperty('quantity');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
    } catch (error) {
      expect(error).toBe('error');
    }
  })

  test('404: Product not found', async () => {
    try {
      const res = await supertest(app)
        .get('/products/10');

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
describe('PUT /products/id', () => {
  // positive case
  test('201: product updated', async () => {
    try {
      const res = await supertest(app)
        .put('/products/1')
        .send({
          quantity: 12
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

  test('400: product with that name already exist', async () => {
    try {
      const res = await supertest(app)
        .put('/products/1')
        .send({
          name: productData.name
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`product ${productData.name} already exists.`);
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('404: product not found', async () => {
    try {
      const res = await supertest(app)
        .put('/products/10')
        .send({
          quantity: 15,
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("product with id 10 is not found");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})


// DELETE
describe('DELETE /products/id', () => {
  // positive case
  test('200: product deleted', async () => {
    try {
      const res = await supertest(app)
        .delete('/products/1');

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

  test('404: product not found', async () => {
    try {
      const res = await supertest(app)
        .delete('/products/10');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("product with id 10 is not found");
      expect(res.body.data).toBe(0);
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})