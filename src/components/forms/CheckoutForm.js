import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import BtnMain from '../buttons/BtnMain'
import CheckBox from '../inputs/CheckBox'
import { setCart } from '../../actions/cart'
import { checkout } from '../../actions/orders'
import './forms.css'

const CheckoutForm = ({dispatch, cart, closeMe}) => {
	const confirmCheckout = () => {
		dispatch(checkout(cart)).then(success => {
			if (success) {
				closeMe()
			}
		})
	}
	const handleChangeDelivery = val => {
		dispatch(setCart({delivery: val}))
	}
	const renderMeals = meal => {
		return (
			<Fragment>
				<div className="col-2">
					<div className="chekout-meal-image" style={{backgroundImage: `url(${meal.imgUrl})`}}></div>
				</div>
				<div className="col-4">{meal.name}</div>
				<div className="col-3">{meal.price} x {meal.quantity}</div>
				<div className="col-3 text-right">{meal.total} UAH</div>
			</Fragment>
		)
	}
	const totalCart = cart.total + (cart.delivery ? cart.deliveryPrice : 0)
	return (
		<div>
			<div className="mb-3">
				{
					cart.items.map((meal, i) => <div key={i} className="row align-items-center mb-3 justify-content-between">{renderMeals(meal)}</div>)
				}
			</div>
			<hr />
			<div className="mb-3 d-flex align-items-center justify-content-between">
				<div className="d-flex align-items-center">
					<CheckBox value={cart.delivery} onChange={handleChangeDelivery} />
					<span>Delivery</span>
				</div>
				<div>
					{cart.delivery && `${cart.deliveryPrice} UAH`}
				</div>
			</div>
			<div className="mb-3 d-flex justify-content-between cart-total">
				<div>
					<strong>Total:</strong>
				</div>
				<div>
					<strong>{totalCart} UAH</strong>
				</div>
			</div>
			<div className="text-center">
				<BtnMain title="Confirm checkout" onClick={confirmCheckout} />
			</div>
		</div>
	)
}

const mapStateToProps = ({cart}) => ({
	cart
})

export default connect(mapStateToProps)(CheckoutForm)
