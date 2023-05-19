const { component_suppliers, suppliers, components } = require('./../models');

module.exports = {
  index: async (req, res, next) => {
    try {
      const data = await component_suppliers.findAll();

      return res.status(200).json({
        status: true,
        message: 'success',
        data: data
      });
    } catch (err) {
      next(err);
    }
  },
  store: async (req, res, next) => {
    try {
      const { supplier_id, component_id } = req.body;
      const supplier = await suppliers.findOne({where: {id: supplier_id}})
      const component = await components.findOne({where: {id: component_id}})
      const component_supplier = await component_suppliers.findOne(
        {where: {
          supplier_id,
          component_id,
        }})

      if (!supplier || !component) {
        return res.status(404).json({
          status: false,
          message: 'supplier or component not found.',
        });
      }

      if (component_supplier) {
        return res.status(400).json({
          status: false,
          message: 'data already exists.',
        });
      }

      const data = await component_suppliers.create({
        supplier_id: supplier_id,
        component_id: component_id
      })

      return res.status(201).json({
        status: true,
        message: 'success',
        data: data
      });
    } catch (err) {
      next(err);
    }
  },
  show: async (req, res, next) => {
    try {
      const supplier_id = req.params.id;
      const data = await component_suppliers.findOne({where: {id: supplier_id}})

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
        data: data,
      })
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const data_id = req.params.id;
      const { supplier_id, component_id } = req.body;
      const supplier = await suppliers.findOne({where: {id: supplier_id}})
      const component = await components.findOne({where: {id: component_id}})
      const component_supplier = await component_suppliers.findOne(
        {where: {
          supplier_id,
          component_id,
        }})

      if (!supplier || !component) {
        return res.status(404).json({
          status: false,
          message: 'supplier or component not found.',
        });
      }

      if (component_supplier) {
        return res.status(400).json({
          status: false,
          message: 'data already exists.',
        });
      }

      const updated = await component_suppliers.update(
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
      const supplier_id = req.params.id;

      const deleted = await component_suppliers.destroy({where:
      {id: supplier_id}})

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `data with id ${supplier_id} is not found`,
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
