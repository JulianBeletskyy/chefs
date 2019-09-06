import React from 'react'
import './cards.css'

const MealCard = ({imgUrl, description, ingredients, name, price, weight, editMeal}) => {
	return (
		<div className="meal-card d-flex flex-column" onClick={editMeal}>
			<div>
				<div className="meal-image" style={{backgroundImage: `url(${imgUrl})`}}>
					<span className="meal-card-name">{name}</span>
				</div>
			</div>
			<div className="meal-card-body">
				<div className="meal-card-desc">{description}</div>
			</div>
			<div className="meal-card-footer mt-auto">
				<div><strong>Ingridients: </strong>{ingredients}</div>
				<div><strong>Weight: </strong>{weight}gr</div>
			</div>
		</div>
	)
}

export default MealCard
