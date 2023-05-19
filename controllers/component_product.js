const { component_products, products, components } = require('./../models');

module.exports = {
  index: async (req, res, next) => {
    try {
      const data = await component_products.findAll();

      return res.status(200).json({
        status: true,
        message: 'success',
        data
      });
    } catch (err) {
      next(err);
    }
  },
  store: async (req, res, next) => {
    try {
      const { product_id, component_id } = req.body;

      const product = await products.findOne({where: {id: product_id}})
      const component = await components.findOne({where: {id: component_id}})
      const component_product = await component_products.findOne(
        {where: {
          product_id,
          component_id,
        }})

      if (!product || !component) {
        return res.status(404).json({
          status: false,
          message: 'product or component not found.',
        });
      }

      if (component_product) {
        return res.status(400).json({
          status: false,
          message: 'data already exists.',
        });
      }

      const data = await component_products.create({
        product_id: product_id,
        component_id: component_id
      })

      return res.status(201).json({
        status: true,
        message: 'success',
        data
      });
    } catch (err) {
      next(err);
    }
  },
  show: async (req, res, next) => {
    try {
      const data_id = req.params.id;
      const data = await component_products.findOne({where: {id: data_id}})

      if (!data) {
        return res.status(404).json({
          status: false,
          message: 'data not found',
          data: null
        });
      }
      return res.status(200).json({
        status: true,
        message: 'success',
        data,
      })
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const data_id = req.params.id;
      const { product_id, component_id } = req.body;
      const product = await products.findOne({where: {id: product_id}})
      const component = await components.findOne({where: {id: component_id}})
      const component_product = await component_products.findOne(
        {where: {
          product_id,
          component_id,
        }})

      if (!product || !component) {
        return res.status(404).json({
          status: false,
          message: 'product or component not found.',
        });
      }

      if (component_product) {
        return res.status(400).json({
          status: false,
          message: 'data already exists.',
        });
      }

      const updated = await component_products.update(
        req.body, {where:
        {id: data_id}})
      
      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `data with id ${data_id} is not found`,
          data: null
        })
      }

      return res.status(201).json({
        message: 'success',
        data: updated
      })
    } catch(err) {
      next(err);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const data_id = req.params.id;

      const deleted = await component_products.destroy({where:
      {id: data_id}})

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `data with id ${data_id} is not found`,
          data: deleted
        })
      }

      return res.status(200).json({
        status: true,
        message: "success",
        data: deleted
      })
    } catch(err) {
      next(err);
    }
  }
}
