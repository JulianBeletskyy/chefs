import express from 'express'
import UserController from '../controllers/UserController'
import Authorization from '../middlewares/Authorization'

const userRoutes = express.Router()

const Auth = new Authorization(['chef', 'client'])
userRoutes.use(Auth.authorize, Auth.authRole)

userRoutes.put('/', UserController.update)
userRoutes.get('/chefs', UserController.getChefs)

export default userRoutes