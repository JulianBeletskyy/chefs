import { User, Meal } from '../models'
import sequelize, { Op } from 'sequelize'
import Authorization from '../middlewares/Authorization'
import bcryptjs from 'bcryptjs'
import { io } from '../app'
import { queries } from '../utils'

const login = async (req, res) => {
	const { email, password } = req.body
	const user = await User.findOne({
		where: { email }
	})
	if (!user) {
		return res.status(400).json({
			validate: {
				email: 'There is no user with this email'
			}
		})
	}

	const check = bcryptjs.compareSync(password, user.password)
	if (!check) {
		return res.status(400).json({
			validate: {
				password: 'Invalid Password'
			}
		})
	}
	const token = Authorization.generateToken(user)

	return res.status(200).json({message: 'User succesfully login', data: {user, token} })
}

const signup = async (req, res) => {
	const { firstName, email, password, role } = req.body

	await User.findOrCreate({
		where: { email },
		defaults: {
			firstName,
			role,
			email: email,
			password,
		}
	}).then(([user, created]) => {
		if (!created) {
			return res.status(400).send({
				validate: {
					email: 'Email already in use'
				}
			})
		}
		const token = Authorization.generateToken(user)
		return res.status(200).json({message: 'User created', data: {user: user, token}})
	})
}

const update = async (req, res) => {
	const { firstName, bussinesName, address, lat, lng, phone } = req.body
	const { authUser } = req
	await authUser.update({
		firstName,
		bussinesName,
		address,
		lat,
		lng,
		phone
	}).then(user => {
		return res.status(200).json({user, message: 'User succesfully updated'})
	})
}

const getChefs = async (req, res) => {
	const { authUser } = req
	const rawQuery = queries.chefsWithDistance(authUser.lat, authUser.lng)
	const chefs = await User.findAll({
		where: {'role': 'chef'},
		attributes: {
			include: [
				[User.sequelize.literal(rawQuery), 'distance'],
			],
			exclude: ['createdAt', 'updatedAt', 'lng', 'lat', 'password', 'passwordResetToken', 'passwordTokenExpiry', 'role']
		},
		include: [
			{
				model: Meal,
				as: 'meals',
				attributes: ['imgUrl'],
				required: true,
			}
		]
	})
	return res.status(200).json({chefs})
}

const getChefInfo = async (req, res) => {
	const { chefId } = req.params
	const { authUser } = req
	const rawQuery = queries.chefsWithDistance(authUser.lat, authUser.lng)
	const chef = await User.findByPk(chefId, {
		attributes: {
			exclude: ['createdAt', 'updatedAt', 'password', 'passwordResetToken', 'passwordTokenExpiry', 'role'],
			include: [[User.sequelize.literal(rawQuery), 'distance']],
		},
		include: [
			{
				model: Meal,
				as: 'meals',
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'userId']
				}
			}
		]
	})
	return res.status(200).json({chef: chef})
}

export default {
	login,
	signup,
	update,
	getChefs,
	getChefInfo,
}