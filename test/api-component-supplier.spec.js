const supertest = require('supertest');
const app = require('../app');
const truncate = require('../utils/truncate');
const init_data = require('../utils/init-data');

// truncate.destroyComponentSupplier();
// truncate.destroyProduct();
truncate.destroyComponent();
truncate.destroySuppliers();
init_data.insertComponent();
init_data.insertSupplier();

const componentSupplierData = {
  component_id: 1,
  supplier_id: 1
};

// POST
describe('POST /component_suppliers', () => {
  // positive case
  test('201: component_suppliers created', async () => {
    try {
      const res = await supertest(app)
        .post('/component_suppliers')
        .send(componentSupplierData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('component_id');
      expect(res.body.data).toHaveProperty('supplier_id');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('400: component_supplier already exist', async () => {
    try {
      const res = await supertest(app)
        .post('/component_suppliers')
        .send(componentSupplierData);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`data already exists.`);
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('404: supplier or component not found', async () => {
    try {
      const res = await supertest(app)
        .post('/component_suppliers')
        .send({
          component_id: 10,
          supplier_id: 10
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("supplier or component not found.");
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})


// GET
describe('GET /component_suppliers', () => {
  // positive case
  test('200: GET data success', async () => {
    try {
      const res = await supertest(app)
        .get('/component_suppliers');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
    } catch (error) {
      expect(error).toBe('error');
    }
  })
})


// GET BY ID
describe('GET /component_suppliers/:id', () => {
  // positive case
  test('200: GET data success', async () => {
    try {
      const res = await supertest(app)
        .get('/component_suppliers/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
    } catch (error) {
      expect(error).toBe('error');
    }
  })

  test('404: component_supplier not found', async () => {
    try {
      const res = await supertest(app)
        .get('/component_suppliers/10');

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
describe('PUT /component_suppliers/id', () => {
  // positive case
  test('201: component_supplier updated', async () => {
    try {
      const res = await supertest(app)
        .put('/component_suppliers/1')
        .send({
          component_id: 1,
          supplier_id: 2
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

  test('400: data already exist', async () => {
    try {
      const res = await supertest(app)
        .put('/component_suppliers/1')
        .send({
          component_id: 1,
          supplier_id: 2
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`data already exists.`);
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('404: component or product not found', async () => {
    try {
      const res = await supertest(app)
        .put('/component_suppliers/1')
        .send({
          component_id: 10,
          supplier_id: 10
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("supplier or component not found.");
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})


// DELETE
describe('DELETE /component_suppliers/id', () => {
  // positive case
  test('200: component_supplier deleted', async () => {
    try {
      const res = await supertest(app)
        .delete('/component_suppliers/1');

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

  test('404: component_supplier not found', async () => {
    try {
      const res = await supertest(app)
        .delete('/component_suppliers/10');

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