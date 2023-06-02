const express = require('express');
const router = express.Router();
const { 
  component,
  product,
  supplier,
  component_product,
 } = require('./../controllers');
const component_supplier = require('./../controllers/component_supplier');
const user = require('./../controllers/user');
const rbac = require('../controllers/rbac');
const enums = require('../utils/enum');
const middlewares = require('../utils/middlewares');
const multer = require('multer')();
const nodemailer = require('../utils/nodemailer');

// authorization
router.get('/auth/oauth', user.googleOauth2);
router.post('/auth/register', user.register);
router.post('/auth/login', user.login);
router.get('/auth/whoami', middlewares.auth, user.whoami);

// upload image
router.put('/profile/:id/picture', multer.single('media'), user.updatePhoto);

// component
router.get('/components', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, false), component.index);
router.get('/components/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, false), component.show);
router.post('/components', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, true), component.store);
router.put('/components/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, true), component.update);
router.delete('/components/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.components, true, true), component.destroy);

// product
router.get('/products', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false), product.index);
router.get('/products/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, false), product.show);
router.post('/products', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, true), product.store);
router.put('/products/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, true), product.update);
router.delete('/products/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.products, true, true), product.destroy);

// supplier
router.get('/suppliers', middlewares.auth, middlewares.rbac(enums.rbacModule.suppliers, true, false), supplier.index);
router.get('/suppliers/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.suppliers, true, false), supplier.show);
router.post('/suppliers', middlewares.auth, middlewares.rbac(enums.rbacModule.suppliers, true, true), supplier.store);
router.put('/suppliers/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.suppliers, true, true), supplier.update);
router.delete('/suppliers/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.suppliers, true, true), supplier.destroy);

// component_product
router.get('/component_products', middlewares.auth, middlewares.rbac(enums.rbacModule.component_products, true, false), component_product.index);
router.get('/component_products/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.component_products, true, false), component_product.show);
router.post('/component_products', middlewares.auth, middlewares.rbac(enums.rbacModule.component_products, true, true), component_product.store);
router.put('/component_products/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.component_products, true, true), component_product.update);
router.delete('/component_products/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.component_products, true, true), component_product.destroy);

// component_supplier
router.get('/component_suppliers', middlewares.auth, middlewares.rbac(enums.rbacModule.component_suppliers, true, false), component_supplier.index);
router.get('/component_suppliers/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.component_suppliers, true, false), component_supplier.show);
router.post('/component_suppliers', middlewares.auth, middlewares.rbac(enums.rbacModule.component_suppliers, true, true), component_supplier.store);
router.put('/component_suppliers/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.component_suppliers, true, true), component_supplier.update);
router.delete('/component_suppliers/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.component_suppliers, true, true), component_supplier.destroy);

// module
router.post('/rbac/modules', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, true), rbac.modules.store);
router.get('/rbac/modules', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false), rbac.modules.index);
router.get('/rbac/modules/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false), rbac.modules.show);

// role
router.post('/rbac/roles', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, true), rbac.roles.store);
router.get('/rbac/roles', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false), rbac.roles.index);
router.get('/rbac/roles/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false), rbac.roles.show);

// role access
router.post('/rbac/roleaccess', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, true), rbac.roleaccess.store);
router.get('/rbac/roleaccess', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false), rbac.roleaccess.index);
router.get('/rbac/roleaccess/:id', middlewares.auth, middlewares.rbac(enums.rbacModule.authorization, true, false), rbac.roleaccess.show);

// mailer
router.get('/verify-email', user.verifyEmailPage);
router.post('/auth/verify-email', user.verifyEmail);
router.post('/auth/account-status', user.updateAccountStatus);
router.get('/test/mailer', async (req, res) => {
  try {
      // send email
      const html = await nodemailer.getHtml('welcome.ejs', {user: {name: 'Fitri'}})
      nodemailer.sendMail('a32623944@gmail.com', 'Ini Email dari Fitri', html);

      return res.status(200).json({
          status: true,
          message: 'success',
          data: null
      });
  } catch (error) {
      throw error;
  }
});

module.exports = router;