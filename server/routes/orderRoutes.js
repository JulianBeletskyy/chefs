import express from 'express'
import OrderController from '../controllers/OrderController'
import Authorization from '../middlewares/Authorization'

const orderRoutes = express.Router()

const Auth = new Authorization(['chef', 'client'])
orderRoutes.use(Auth.authorize, Auth.authRole)

orderRoutes.get('/', OrderController.getOrders)
orderRoutes.post('/checkout', OrderController.createOrder)
orderRoutes.put('/status/:orderId', OrderController.changeOrderStatus)

export default orderRoutes