import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './cards.css'
import { toggleModal } from '../../actions/ui'
import cn from 'classnames'

const OrderCard = ({order}) => {
	const { orderId, meals, createdAt, status, newest } = order
	const [isNewest, setIsNewest] = useState(newest)
	useEffect(() => {
		if (newest) {
			setTimeout(() => {
				setIsNewest(false)
			}, 2000)
		}
	}, [newest])
	const dispatch = useDispatch()
	const handleClickOrder = () => {
		dispatch(toggleModal(true, orderId, <div></div>))
	}
	return (
		<div className={cn('order-card', {newest: isNewest})} onClick={handleClickOrder}>
			<div className="mb-2">
				<strong>#{orderId}</strong>
			</div>
			<div>
				{
					meals.map((meal, i) => <div key={i}>{meal.name}</div>)
				}
			</div>
			<div>
				{status}
			</div>
		</div>
	)
}

export default OrderCard
