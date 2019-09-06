import express from 'express'
import PaymentController from '../controllers/PaymentController'

const paymentRoutes = express.Router()

paymentRoutes.get('/createCustomer', PaymentController.createCustomer)
paymentRoutes.post('/createCutomerToken', PaymentController.createCutomerToken)
paymentRoutes.get('/customerSources/:customerId', PaymentController.customerSources)

export default paymentRoutes