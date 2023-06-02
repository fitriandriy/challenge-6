const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;
const {modules, role_access} = require('../models');

module.exports = {
    auth: async (req, res, next) => {
        try {
            const {authorization} = req.headers;

            console.log('TOKEN :', authorization);
            if (!authorization) {
                return res.status(401).json({
                    status: false,
                    message: 'you\'re not authorized!',
                    data: null
                });
            }

            const data = await jwt.verify(authorization, JWT_SECRET_KEY);
            req.user = {
                id: data.id,
                name: data.name,
                email: data.email,
                role_id: data.role_id
            };

            next();
        } catch (err) {
            next(err);
        }
    },

    rbac: (moduleName, is_read = false, is_write = false) => {
        return async (req, res, next) => {
            try {
                const {role_id} = req.user;

                if (!role_id) {
                    return res.status(401).json({
                        status: false,
                        message: 'you\'re not authorized!',
                        data: null
                    });
                }

                const module = await modules.findOne({where: {name: moduleName}});
                if (!module) {
                    return res.status(401).json({
                        status: false,
                        message: 'you\'re not authorized!',
                        data: null
                    });
                }

                const roleAccess = await role_access.findOne({where: {module_id: module.id, role_id: role_id}});
                console.log(roleAccess);
                if (!roleAccess) return res.status(401).json({status: false, message: 'you\'re not authorized!', data: null});

                console.log('rbac read :', is_read);
                console.log('user read :', roleAccess.is_read);

                console.log('rbac write :', is_write);
                console.log('user write :', roleAccess.is_write);

                if (is_read && !roleAccess.is_read) return res.status(401).json({status: false, message: 'you\'re not authorized!', data: null});
                if (is_write && !roleAccess.is_write) return res.status(401).json({status: false, message: 'you\'re not authorized!', data: null});

                next();
            } catch (err) {
                next(err);
            }
        };
    }
};