import { Router } from 'express'
import passport from 'passport'

import { usersDaoMongoose } from '../daos/user/mongoose/users.dao.mongoose.js'
import { tieneRol } from '../middlewares/authorization.js'
import { appendJwtAsCookie } from '../middlewares/authentication.js'

// Create router instance
export const usersRouter = Router()

// Route for password reset
usersRouter.patch('/reset-password',
    async function (req, res, next) {
        try {
            // Call DAO function to reset password
            req.user = await usersDaoMongoose.resetPassword(req.body)
            next()
        } catch (error) {
            res['notFound'](error.message)
        }
    },
    appendJwtAsCookie,
    (req, res, next) => {
        res['ok'](req.user)
    }
)

// Route for changing user role
usersRouter.patch('/change-role/:userId',
    passport.authenticate('jwt', { failWithError: true, session: false }),
    async function (req, res, next) {
        try {
            // Call DAO function to change user role
            const updatedUser = await usersDaoMongoose.changeUserRole(req.params.userId, req.body.newRole)
            res['ok'](updatedUser)
        } catch (error) {
            res['notFound'](error.message)
        }
    }
)
//------------------old routes-----------------------
usersRouter.post('/',
    passport.authenticate('local-register',
        { failWithError: true, session: false }),
    appendJwtAsCookie,
    async function (req, res) {
        res['creado'](req.user)
    },
)

usersRouter.put('/current',
    passport.authenticate('jwt',
        { failWithError: true, session: false }),
    async function (req, res, next) {
        try {
            req.user = await usersDaoMongoose.actualizar(req.body)
            next()
        } catch (error) {
            res['notFound'](error.message)
        }
    },
    appendJwtAsCookie,
    (req, res, next) => {
        res['ok'](req.user)
    }
)

usersRouter.patch('/',
    async function (req, res, next) {
        try {
            req.user = await usersDaoMongoose.resetearContrasenia(req.body)
            next()
        } catch (error) {
            res['notFound'](error.message)
        }
    },
    appendJwtAsCookie,
    (req, res, next) => {
        res['ok'](req.user)
    }
)

usersRouter.get('/current',
    passport.authenticate('jwt',
        { failWithError: true, session: false }),
    async (req, res) => {
        res['ok'](req.user)
    },
)

usersRouter.get('/',
    passport.authenticate('jwt',
        { failWithError: true, session: false }),
    tieneRol(['admin', 'premium']), // Access for admin and premium users only
    async (req, res) => {
        const users = await usersDaoMongoose.find().lean()
        res['ok'](users)
    },
)
