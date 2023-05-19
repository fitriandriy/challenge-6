const express = require('express');
const router = express.Router();
const { 
  component,
  product,
  supplier,
  component_product,
  // component_supplier,
 } = require('./../controllers');
const component_supplier = require('./../controllers/component_supplier');

// component
router.get('/components', component.index);
router.post('/components', component.store);
router.get('/components/:id', component.show);
router.put('/components/:id', component.update);
router.delete('/components/:id', component.destroy);

// product
router.get('/products', product.index);
router.post('/products', product.store);
router.get('/products/:id', product.show);
router.put('/products/:id', product.update);
router.delete('/products/:id', product.destroy);

// supplier
router.get('/suppliers', supplier.index);
router.post('/suppliers', supplier.store);
router.get('/suppliers/:id', supplier.show);
router.put('/suppliers/:id', supplier.update);
router.delete('/suppliers/:id', supplier.destroy);

// component_product
router.get('/component_products', component_product.index);
router.post('/component_products', component_product.store);
router.get('/component_products/:id', component_product.show);
router.put('/component_products/:id', component_product.update);
router.delete('/component_products/:id', component_product.destroy);

// component_supplier
router.get('/component_suppliers', component_supplier.index);
router.post('/component_suppliers', component_supplier.store);
router.get('/component_suppliers/:id', component_supplier.show);
router.put('/component_suppliers/:id', component_supplier.update);
router.delete('/component_suppliers/:id', component_supplier.destroy);

module.exports = router;