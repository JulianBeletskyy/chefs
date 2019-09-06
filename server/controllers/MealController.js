import { Meal } from '../models'
import { Op } from 'sequelize'
import upload from '../services/upload'

const getMeals = async (req, res) => {
	const { authUser } = req
	const meals = await authUser.getMeals({
		attributes: ['mealId', 'name', 'price', 'imgUrl', 'description', 'ingredients', 'weight']
	})
	return res.status(200).json({ meals })
}

const create = async (req, res) => {
	const { name, price, description, ingredients, weight } = req.body
	const { file, authUser } = req
	let imgUrl = ''
	if (file) {
		imgUrl = upload(file, 'meals')
	}
	await Meal.create({
		userId: authUser.userId,
		name,
		price: parseFloat(price),
		description,
		ingredients,
		weight,
		imgUrl,
	}).then((meal) => {
		if (!meal) {
			return res.status(409).send({ error: 'Some error' })
		}
		return res.status(200).json({meal, message: 'Meal successfully created'})
	}).catch(error => {
		console.log(error)
	})
}

const update = async (req, res) => {
	const { mealId } = req.params
	const { file, authUser } = req
	const { name, price, description, ingredients, weight, imgUrl } = req.body
	let newImgUrl = ''
	if (file) {
		newImgUrl = upload(file, 'meals')
	}
	await Meal.findByPk(mealId).then(meal => {
		meal.update({
			name,
			price,
			description,
			ingredients,
			weight,
			imgUrl: newImgUrl || imgUrl.replace('http://localhost:3001/', ''),
		}).then(meal => {
			return res.status(200).json({meal, message: 'Meal successfully updated'})
		}).catch(error => {
			console.log(error)
		})
	})
}

export default {
	create,
	update,
	getMeals,
}