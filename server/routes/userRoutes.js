import express from 'express'
import UserController from '../controllers/UserController'
import Authorization from '../middlewares/Authorization'
import Validation from '../middlewares/Validation'

const userRoutes = express.Router()

const Auth = new Authorization(['chef', 'client'])
userRoutes.use(Auth.authorize, Auth.authRole)

const Validator = new Validation()

userRoutes.put('/', Validator.updateProfile, UserController.update)
userRoutes.get('/chefs', UserController.getChefs)
userRoutes.get('/chefs/:chefId', UserController.getChefInfo)

export default userRoutes