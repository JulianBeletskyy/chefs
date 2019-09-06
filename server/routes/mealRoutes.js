import express from 'express'
import MealController from '../controllers/MealController'
import asyncWrapper from './asyncWrapper'
import multer from 'multer'
import Authorization from '../middlewares/Authorization'

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './static/uploads/tmp')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({
  storage: storage
})

const Auth = new Authorization(['chef'])

const mealRoutes = express.Router()
mealRoutes.use(Auth.authorize, Auth.authRole)

mealRoutes.get('/', MealController.getMeals)
mealRoutes.post('/', upload.single('imgUrl'), MealController.create)
mealRoutes.post('/:mealId', upload.single('imgUrl'), MealController.update)


export default mealRoutes