import { User, Meal } from '../models'
import sequelize, { Op } from 'sequelize'
import Authorization from '../middlewares/Authorization'
import bcryptjs from 'bcryptjs'
import { io } from '../app'
import { queries } from '../utils'

const login = async (req, res) => {
	const { login, password } = req.body
	const user = await User.findOne({
		where: { email: login }
	})
	if (!user) {
		return res.status(401).json({ message: 'Invalid Credentials' })
	}

	const check = bcryptjs.compareSync(password, user.password)
	if (!check) {
		return res.status(401).json({ message: 'Invalid Password' })
	}
	if (user.role === 'client') {
		io.to('chefs').emit('clientLogin', {message: 'Client login!!!'})
	}
	
	const token = Authorization.generateToken(user)

	return res.status(200).json({message: 'User succesfully login', data: {user, token} })
}

const signup = async (req, res) => {
	const { firstName, login, password, role } = req.body

	await User.findOrCreate({
		where: { email: login },
		defaults: {
			firstName,
			role,
			email: login,
			phone: login,
			password,
		}
	}).then(([user, created]) => {
		if (!created) {
			return res.status(409).send({ error: 'Email already in use' });
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
		attributes: [
			[User.sequelize.literal(rawQuery), 'distance'],
			'firstName',
			'bussinesName',
			'address',
			'lat',
			'lng',
			'phone',
			'userId'
		],
		include: [
			{
				model: Meal,
				as: 'meals',
				attributes: ['imgUrl']
			}
		]
	})
	return  res.status(200).json({chefs: chefs})
}

export default {
	login,
	signup,
	update,
	getChefs,
}