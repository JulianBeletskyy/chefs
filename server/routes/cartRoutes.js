import express from 'express'
import CartController from '../controllers/CartController'
import Authorization from '../middlewares/Authorization'

const cartRoutes = express.Router()

const Auth = new Authorization(['client'])
cartRoutes.use(Auth.authorize, Auth.authRole)

cartRoutes.get('/', CartController.getCart)
cartRoutes.post('/add', CartController.addToCart)
cartRoutes.post('/decrement', CartController.decrementCart)
cartRoutes.post('/increment', CartController.incrementCart)
cartRoutes.delete('/remove/:mealId', CartController.removeFromCart)

export default cartRoutes