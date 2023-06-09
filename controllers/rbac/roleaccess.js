const {roles, modules, role_access} = require('../../models');

module.exports = {
    store: async (req, res) => {
        try {
            const {role_id, module_id, is_read, is_write} = req.body;
            if (!role_id || !module_id || is_read == undefined || is_write == undefined) {
                return res.status(400).json({
                    status: false,
                    message: 'bad request!',
                    data: null
                });
            }

            const roleAccess = await role_access.findOne({where: {role_id, module_id}});
            if (roleAccess) {
                return res.status(400).json({
                    status: false,
                    message: `role access is already exist!`,
                    data: roleAccess
                });
            }
            const role = await roles.findOne({where: {id: role_id}});
            if (!role) {
                return res.status(400).json({
                    status: false,
                    message: `role with id ${role_id} is not exist!`,
                    data: null
                });
            }
            const moduleData = await modules.findOne({where: {id: module_id}});
            if (!moduleData) {
                return res.status(400).json({
                    status: false,
                    message: `module with id ${module_id} is not exist!`,
                    data: null
                });
            }

            const newRoleAccess = await role_access.create({role_id, module_id, is_read, is_write});
            return res.status(201).json({
                status: true,
                message: `role access created!`,
                data: newRoleAccess
            });

        } catch (error) {
            throw error;
        }
    },

    index: async (req, res) => {
        try {
            const roleAccess = await role_access.findAll();
            return res.status(200).json({
                status: false,
                message: `success`,
                data: roleAccess
            });
        } catch (error) {
            throw error;
        }
    },

    show: async (req, res) => {
        try {
            const {id} = req.params;
            const roleAccess = await role_access.findOne({where: {id}});
            if (!roleAccess) {
                return res.status(404).json({
                    status: false,
                    message: `role access with id ${id} is not exist!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: false,
                message: `success`,
                data: roleAccess
            });
        } catch (error) {
            throw error;
        }
    }
};
