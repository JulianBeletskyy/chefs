import React from 'react'
import cn from 'classnames'
import BtnMain from '../buttons/BtnMain'
import ReactTooltip from 'react-tooltip'
import './cards.css'

const MealCard = ({imgUrl, description, ingredients, name, price, weight, editMeal, role, addToBasket, mealId}) => {
	return (
		<div className={cn(`meal-card d-flex flex-column ${role}`)} onClick={editMeal}>
			<div>
				<div className="meal-image" style={{backgroundImage: `url(${imgUrl})`}}>
					<span className="meal-card-name">{name}</span>
				</div>
			</div>
			<div className="meal-card-body d-flex justify-content-between">
				{
					role === 'client' && <div className="meal-card-price">{price} UAH</div>
				}
			</div>
			<div data-tip={description} data-for={`description-${mealId}`} className="meal-card-desc">{description}&nbsp;</div>
			<ReactTooltip place="top" className="tooltip" id={`description-${mealId}`} />
			<div className="meal-card-footer mt-auto">
				<div className="meal-card-ingredients">
					<strong>Ingridients: </strong><span data-tip={ingredients} data-for={`description-${mealId}`}>{ingredients}</span>
					<ReactTooltip place="top" className="tooltip" id={`description-${mealId}`} />
				</div>
				<div className="mb-2"><strong>Weight: </strong>{weight}gr</div>
				{
					role === 'client' &&
						<div className="text-center">
							<BtnMain title="Add to basket" className="w-100" onClick={addToBasket} />
						</div>
				}
			</div>
		</div>
	)
}

export default MealCard
