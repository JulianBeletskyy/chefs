import models, { Cart, User, Meal } from '../models'
import sequelize from 'sequelize'

const getCart = async (req, res) => {
	const { authUser } = req
	const cart = await getUserCart(authUser)
	return res.status(200).json({cart })
}

const addToCart = async (req, res) => {
	const { mealId } = req.body
	const { authUser } = req
	await Cart.findOrCreate({
		where: {
			mealId: mealId,
			userId: authUser.userId,
		},
		defaults: {
			mealId,
			userId: authUser.userId,
			quantity: 1,
		}
	}).then(async ([cart, created]) => {
		if (!created) {
			await cart.increment('quantity', {by: 1})
		}
	})

	const cart = await getUserCart(authUser)
	
	return res.status(200).json({cart})
}

const decrementCart = async (req, res) => {
	const { mealId } = req.body
	const { authUser } = req
	await Cart.findOne({
		where: {
			userId: authUser.userId,
			mealId: mealId
		}
	}).then(async cart => {
		await cart.decrement('quantity', {by: 1})
	})

	const cart = await getUserCart(authUser)

	return res.status(200).json({cart})
}
const incrementCart = async (req, res) => {
	const { mealId } = req.body
	const { authUser } = req
	await Cart.findOne({
		where: {
			userId: authUser.userId,
			mealId: mealId
		}
	}).then(async cart => {
		await cart.increment('quantity', {by: 1})
	})
	
	const cart = await getUserCart(authUser)

	return res.status(200).json({cart})
}

const removeFromCart = async (req, res) => {
	const { mealId } = req.params
	const { authUser } = req
	await Cart.findOne({
		where: {
			userId: authUser.userId,
			mealId: mealId
		}
	}).then(async cart => {
		await cart.destroy()
	})
	
	const cart = await getUserCart(authUser)

	return res.status(200).json({cart})
}

const getUserCart = async authUser => {
	const cart = await authUser.getCarts({
		attributes: [
			'price',
			'name',
			'mealId',
			'userId',
			[Meal.sequelize.literal(`CONCAT('http://localhost:3001/', "imgUrl")`), 'imgUrl'],
			[sequelize.col('Cart.quantity'), 'quantity'], 
			[Meal.sequelize.literal('price * quantity'), 'total']
		],
		order: [[sequelize.col('Cart.createdAt'), 'ASC']],
		raw: true,
	})
	return getCartObject(cart)
}

const getCartObject = cart => {
	if (!cart.length) {
		return {
			total: 0,
			items: [],
			chefId: null,
		}
	}
	return cart.reduce((obj, key) => {
		if (!obj.total) { obj.total = 0 }
		if (!obj.items) { obj.items = [] }
		if (!obj.chefId) { obj.chefId = key.userId }
		const { mealId, name, price, total, quantity, imgUrl } = key
		obj.total += key.total
		obj.items = [...obj.items, { mealId, name, price, total, quantity, imgUrl }]
		return obj
	}, {})
}

export default {
	getCart,
	addToCart,
	decrementCart,
	incrementCart,
	removeFromCart,
}