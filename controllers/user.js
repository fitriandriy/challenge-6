const {users, roles} = require('../models');
const bcryp = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = process.env;
const oauth2 = require('../utils/oauth2');
const imagekit = require('../utils/imagekit');
const nodemailer = require('../utils/nodemailer');

module.exports = {
    register: async (req, res) => {
        try {
            const {name, email, password} = req.body;

            const exist = await users.findOne({where: {email}});
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'email already used!',
                    data: null
                });
            }

            const hashPassword = await bcryp.hash(password, 10);
            const userData = {
                name, email, password: hashPassword, user_type: 'basic'
            };
            
            const userRole = await roles.findOne({where: {name: 'user'}});
            if (userRole) {
                userData.role_id = userRole.id;
            }

            const user = await users.create(userData);

            return res.status(201).json({
                status: true,
                message: 'user created!',
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch (error) {
            throw error;
        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body;

            const user = await users.findOne({where: {email}});
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'credential is not valid!',
                    data: null
                });
            }


            if (user.user_type == 'google' && !user.password) {
                return res.status(400).json({
                    status: false,
                    message: 'your accont is registered with google oauth, you need to login with google oauth2!',
                    data: null
                });
            }

            const passwordCorrect = await bcryp.compare(password, user.password);
            if (!passwordCorrect) {
                return res.status(400).json({
                    status: false,
                    message: 'credential is not valid!',
                    data: null
                });
            }

            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role_id
            };

            const token = await jwt.sign(payload, JWT_SECRET_KEY);
            return res.status(200).json({
                status: true,
                message: 'login success!',
                data: {
                    token: token
                }
            });

        } catch (error) {
            throw error;
        }
    },

    whoami: async (req, res) => {
        try {
            return res.status(200).json({
                status: true,
                message: 'fetch user success!',
                data: req.user
            });
        } catch (error) {
            throw error;
        }
    },

    googleOauth2: async (req, res) => {
        const {code} = req.query;
        if (!code) {
            const googleLoginUrl = oauth2.generateAuthUrl();
            return res.redirect(googleLoginUrl);
        }

        await oauth2.setCreadentials(code);
        const {data} = await oauth2.getUserData();

        let user = await users.findOne({where: {email: data.email}});
        
        const userRole = await roles.findOne({where: {name: 'user'}});


        if (!user) {
            user = await users.create({
                name: data.name,
                email: data.email,
                user_type: 'google',
                role_id: userRole.id
            });
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id
        };

        const token = await jwt.sign(payload, JWT_SECRET_KEY);
        return res.status(200).json({
            status: true,
            message: 'login success!',
            data: {
                token: token
            }
        });
    },

    updatePhoto: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await users.findOne({where: {id}})
            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: 'user not found',
                    data: null
                });
            }

            const stringFile = req.file.buffer.toString('base64');

            const uploadFile = await imagekit.upload({
                fileName: req.file.originalname,
                file: stringFile
            });

            const update = await users.update({ avatar: uploadFile.url }, {where: {id}})

            return res.status(200).json({
                status: true,
                message: 'success',
                data: {
                    url: uploadFile.url
                }
            });
        } catch (error) {
            next(error)
        }
    },

    verifyEmail: async (req, res) => {
        const {email} = req.body;

        const user = await users.findOne({where: {email}});
        if(!user) {
            return res.status(404).json({
                status: true,
                message: `user with email ${email} is not found`,
                data: null
            });
        }

        if (user) {
            const url = `${req.protocol}://${req.get('host')}/verify-email?email=${email}`;

            const html = await nodemailer.getHtml('verifyemail.ejs', {name: user.name, url});
            nodemailer.sendMail(user.email, 'Verify Email', html);
        }

        return res.status(200).json({
            status: true,
            message: 'we will send a email if the email is registered!',
            data: null
        });
    },

    verifyEmailPage: (req, res) => {
        const {email} = req.query;
        return res.render('template/auth/verify-email', {message: null, email});
    },

    updateAccountStatus: async (req, res) => {
        try {
            const {email} = req.query;
            const user = await users.findOne({where: {email}});

            if (!user) {
                return res.render('template/auth/verify-email', {message: 'please register!', email});
            }

            const updated = await users.update({is_verified: true}, {where: {id: user.id}});

            if (updated[0] == 0) {
                return res.render('template/auth/verify-email', {message: `Account verification failed!`, email});
            }

            return res.send('Email verified!');
        } catch (err) {
            throw err;
        }
    }
};