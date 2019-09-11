import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import MealCard from '../../components/cards/MealCard'
import BtnMain from '../../components/buttons/BtnMain'
import { toggleModal } from '../../actions/ui'
import { getMeals } from '../../actions/meals'
import MealForm from '../../components/forms/MealForm'
import './meals.css'

const Meals = ({dispatch, meals}) => {
	useEffect(() => {
		dispatch(getMeals())
	}, [])
	const openModal = meal => {
		dispatch(toggleModal(true, `${meal.mealId ? 'Update' : 'Create'} meal`, <MealForm meal={meal} />))
	}
	return (
		<div className="meals h-100">
			<div className="text-center mb-3">
				<BtnMain title="Create Meal" onClick={openModal} />
			</div>
			<div className="row">
				{
					meals.map((meal, i) => <div key={i} className="col-sm-3"><MealCard {...meal} editMeal={() => openModal(meal)} /></div>)
				}
			</div>
		</div>
	)
}

const mapStateToProps = ({meals}) => ({
	meals: meals.list
})

export default connect(mapStateToProps)(Meals)
