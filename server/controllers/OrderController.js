import { Order } from '../models'
import { io } from '../app'

const getOrders = async (req, res) => {
	const { authUser } = req
	const orders = await authUser.getChefOrders({raw: true}).reduce((obj, key) => {
		obj[key.status] = [...obj[key.status], key]
		return obj
	}, {
		pending: [], accepted: [], preparing: [], delivered: [],
	})
	return res.status(200).json({orders})
}

const createOrder = async (req, res) => {
	const { authUser } = req
	const { items, total, delivery, deliveryPrice, chefId } = req.body
	await Order.create({
		clientId: authUser.userId,
		chefId,
		meals: items,
		price: total,
		delivery,
		deliveryPrice,
		status: 'pending'
	}).then(async order => {
		if (order) {
			const cart = await authUser.setCarts([])
			io.to(chefId).emit('newOrderCreated', {order: order, message: `New order for you`})
			return res.status(200).json({order, cart, message: 'Order successfully created'})
		}
		return res.status(409).send({ error: 'Some error' })
	})
}

const changeOrderStatus = async (req, res) => {
	const { orderId } = req.params
	const { status } = req.body
	await Order.findByPk(orderId).then(async order => {
		await order.update({status})
		io.to(order.clientId).emit('orderChangeStatus', {order: order, message: `Order ${order.orderId} change status to ${order.status}`})
		return res.status(200).json({order})
	})
}

export default {
	createOrder,
	getOrders,
	changeOrderStatus,
}