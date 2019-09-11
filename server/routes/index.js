import express from 'express'
import authRoutes from './authRoutes'
import userRoutes from './userRoutes'
import mealRoutes from './mealRoutes'
import cartRoutes from './cartRoutes'
import orderRoutes from './orderRoutes'

const apiRoutes = express.Router();

apiRoutes.get('/v1', (req, res) => res.status(200).json({
  message: 'Welcome to the API',
  v1: '/api/v1'
}))

apiRoutes.use('/auth', authRoutes)
apiRoutes.use('/user', userRoutes)
apiRoutes.use('/meals', mealRoutes)
apiRoutes.use('/cart', cartRoutes)
apiRoutes.use('/order', orderRoutes)

export default apiRoutes