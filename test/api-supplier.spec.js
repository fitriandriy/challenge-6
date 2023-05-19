const supertest = require('supertest');
const app = require('../app');
const truncate = require('../utils/truncate');

truncate.destroySuppliers();

const supplierData = {
  name: "Dream Company",
  address: "Banyuwangi"
};

// POST
describe('POST /suppliers', () => {
  test('201: supplier created', async () => {
    try {
      const res = await supertest(app)
        .post('/suppliers')
        .send(supplierData);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data).toHaveProperty('address');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
      expect(res.body.data.name).toBe(supplierData.name);
      expect(res.body.data.address).toBe(supplierData.address);
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('400: supplier already exist', async () => {
    try {
      const res = await supertest(app)
        .post('/suppliers')
        .send(supplierData);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`data already exists.`);
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})


// GET
describe('GET /suppliers', () => {
  test('200: GET data success', async () => {
    try {
      const res = await supertest(app)
        .get('/suppliers');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data[0]).toHaveProperty('id');
      expect(res.body.data[0]).toHaveProperty('name');
      expect(res.body.data[0]).toHaveProperty('address');
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
describe('GET /suppliers/:id', () => {
  test('200: GET data success', async () => {
    try {
      const res = await supertest(app)
        .get('/suppliers/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('name');
      expect(res.body.data).toHaveProperty('address');
      expect(res.body.data).toHaveProperty('createdAt');
      expect(res.body.data).toHaveProperty('updatedAt');
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe('success');
    } catch (error) {
      expect(error).toBe('error');
    }
  })

  test('404: supplier not found', async () => {
    try {
      const res = await supertest(app)
        .get('/suppliers/10');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe('data not found');
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe('error');
    }
  })
})


// UPDATE
describe('PUT /suppliers/id', () => {
  test('201: supplier updated', async () => {
    try {
      const res = await supertest(app)
        .put('/suppliers/1')
        .send({
          address: 'Sempu, Banyuwangi, East Java'
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

  test('400: supplier with that name already exist', async () => {
    try {
      const res = await supertest(app)
        .put('/suppliers/1')
        .send({
          name: supplierData.name
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(`supplier ${supplierData.name} already exists.`);
    } catch (error) {
      expect(error).toBe('error');
    }
  });

  test('404: supplier not found', async () => {
    try {
      const res = await supertest(app)
        .put('/suppliers/10')
        .send({
          address: 'Sempu, Banyuwangi, East Java'
        });

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("supplier with id 10 is not found");
      expect(res.body.data).toBe(null);
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})


// DELETE
describe('DELETE /suppliers/id', () => {
  test('200: supplier deleted', async () => {
    try {
      const res = await supertest(app)
        .delete('/suppliers/1');

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

  test('404: supplier not found', async () => {
    try {
      const res = await supertest(app)
        .delete('/suppliers/10');

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('status');
      expect(res.body).toHaveProperty('message');
      expect(res.body).toHaveProperty('data');
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("supplier with id 10 is not found");
      expect(res.body.data).toBe(0);
    } catch (error) {
      expect(error).toBe('error');
    }
  });
})