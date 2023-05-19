const { components } = require('./../models');

module.exports = {
  index: async (req, res, next) => {
    try {
      const data = await components.findAll();

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
      const { name, description } = req.body;
      const component = await components.findOne({where: {name}})

      if (component) {
        return res.status(400).json({
          status: false,
          message: 'data already exists.',
        });
      }

      const data = await components.create({
        name: name,
        description: description
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
      const component_id = req.params.id;
      const component = await components.findOne({where: {id: component_id}})

      if (!component) {
        return res.status(404).json({
          status: false,
          message: 'data not found',
          data: null
        });
      }
      return res.status(200).json({
        status: true,
        message: 'success',
        data: component,
      })
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const component_id = req.params.id;
      const { name } = req.body;

      if (name) {
        const component = await components.findOne({where: {name: name}})

        if (component) {
          return res.status(400).json({
            status: false,
            message: `product ${name} already exists.`,
          });
        }
      }

      const updated = await components.update(
        req.body, {where:
        {id: component_id}})
      
      if (updated[0] == 0) {
        return res.status(404).json({
          status: false,
          message: `component with id ${component_id} is not found`,
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
      const component_id = req.params.id;

      const deleted = await components.destroy({where:
      {id: component_id}})

      if (!deleted) {
        return res.status(404).json({
          status: false,
          message: `component with id ${component_id} is not found`,
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