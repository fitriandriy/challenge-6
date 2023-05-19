const { suppliers } = require('./../models');

module.exports = {
  index: async (req, res, next) => {
    try {
      const data = await suppliers.findAll();

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
      const { name, address } = req.body;
      const supplier = await suppliers.findOne({where: {name}})

      if (supplier) {
        return res.status(400).json({
          status: false,
          message: 'data already exists.',
        });
      }

      const data = await suppliers.create({
        name: name,
        address: address
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
      const supplier_id = req.params.id;
      const supplier = await suppliers.findOne({where: {id: supplier_id}})

      if (!supplier) {
        return res.status(404).json({
          status: false,
          message: 'data not found',
          data: null
        });
      }
      return res.status(200).json({
        status: true,
        message: 'success',
        data: supplier,
      })
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const supplier_id = req.params.id;
      const { name } = req.body;

      if (name) {
        const supplier = await suppliers.findOne({where: {name}});

        if (supplier) {
          return res.status(400).json({
            status: false,
            message: `supplier ${name} already exists.`,
          });
        }
      }

      const updated = await suppliers.update(
        req.body, {where:
        {id: supplier_id}})
      
      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `supplier with id ${supplier_id} is not found`,
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

      const deleted = await suppliers.destroy({where:
      {id: supplier_id}})

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `supplier with id ${supplier_id} is not found`,
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
