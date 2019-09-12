import express from 'express'
import UserController from '../controllers/UserController'
import Validation from '../middlewares/Validation'
import Authorization from '../middlewares/Authorization'

const Validator = new Validation()

const authRoutes = express.Router()

authRoutes.post('/login', Validator.login, UserController.login)
authRoutes.post('/signup', Validator.signup, UserController.signup)
authRoutes.get('/refreshToken', Authorization.refreshToken)

export default authRoutes;
