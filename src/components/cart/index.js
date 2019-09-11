import React, { useEffect, Fragment, lazy } from 'react'
import { connect } from 'react-redux'
import BtnMain from '../buttons/BtnMain'
import { getCart, incrementCart, decrementCart, removeFromCart } from '../../actions/cart'
import { toggleModal } from '../../actions/ui'
import cn from 'classnames'
import { EmptyBasket } from '../icons'
import CheckoutForm from '../forms/CheckoutForm'
import './cart.css'

const Cart = ({dispatch, cart}) => {
	useEffect(() => {
		dispatch(getCart())
	}, [])
	const decrementMeal = meal => () => {
		if (meal.quantity > 1) {
			dispatch(decrementCart(meal.mealId))
		}
	}
	const incrementMeal = meal => () => {
		dispatch(incrementCart(meal.mealId))
	}
	const removeMeal = meal => () => {
		dispatch(removeFromCart(meal.mealId))
	}
	const handleCheckout = () => {
		dispatch(toggleModal(true, `Checkout`, <CheckoutForm />))
	}
	const renderMeal = meal => {
		return (
			<Fragment>
				<div className="col-4 pr-1 cart-meal-name">{meal.name}</div>
				<div className="col-3 px-1 text-center">
					<span className={cn('cart-minus', {disabled: !(meal.quantity > 1)})} onClick={decrementMeal(meal)}>-</span>
					<span className="cart-quantity">{meal.quantity}</span>
					<span className="cart-plus" onClick={incrementMeal(meal)}>+</span>
				</div>
				<div className="col-5 px-1 text-right">
					{meal.total} UAH
					<span className="cart-remove" onClick={removeMeal(meal)}>x</span>
				</div>
			</Fragment>
		)
	}
	return (
		<div className="cart-wrapper col-sm-3">
			<div className="cart-inner">
				<div className="cart-background"></div>
				<div className="cart d-flex flex-column">
					<div className="text-center">
						<div className="cart-title">Basket</div>
					</div>
					<div className="cart-body flex-fill d-flex flex-column">
						<div className="cart-list flex-fill d-flex flex-column">
							{
								cart.items.length
								? cart.items.map((meal, i) => 
									<div key={i} className="mb-2"><div className="row align-items-center">{renderMeal(meal)}</div></div>)
								: 	<div className="text-center my-auto">
										<div style={{color: '#BCBCBC'}}>Your basket is empty</div>
										<EmptyBasket />
									</div>
							}
						</div>
						<div className="cart-divider"></div>
						<div className="cart-total mt-auto d-flex justify-content-between">
							<div>Total: </div>
							<div>{cart.total} UAH</div>
						</div>
					</div>
					<div className="text-center mt-auto">
						<BtnMain title="Checkout" className="w-100" onClick={handleCheckout} />
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({cart}) => ({
	cart: cart
})

export default connect(mapStateToProps)(Cart)
