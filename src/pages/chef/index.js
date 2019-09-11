import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getChefInfo } from '../../actions/chefs'
import { addToCart } from '../../actions/cart'
import GoogleMap from '../../components/map'
import MealCard from '../../components/cards/MealCard'
import './chef.css'

const Chef = ({dispatch, chefId, chef}) => {
	useEffect(() => {
		dispatch(getChefInfo(chefId))
	}, [])
	const mapStyles = {
		height: 200,
	}
	const addToBasket = meal => {
		dispatch(addToCart(meal.mealId))
	}
	return (
		<div className="chef">
			<div className="chef-info mb-3">
				<div className="row">
					<div className="col-sm-2">
						<div className="chef-info-image"></div>
					</div>
					<div className="col-sm-7">
						<div>
							<div className="chef-bussines-name mb-3">
								<strong>{chef.bussinesName}</strong>
							</div>
							<div>
								<strong>Address: </strong>
								{chef.address}
							</div>
							<div>
								<strong>Distance: </strong>
								{chef.distance}
							</div>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="ml-auto">
							<GoogleMap readOnly lat={chef.lat} lng={chef.lng} styles={mapStyles} />
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				{
					chef.meals.map((meal, i) => <div key={i} className="col-sm-3 mb-3">
						<MealCard {...meal} role="client" addToBasket={() => addToBasket(meal)} />
					</div>)
				}
			</div>
		</div>
	)
}

const mapStateToProps = ({chefs: {chef}}, {match: {params}}) => ({
	chefId: params.chefId,
	chef,
})

export default connect(mapStateToProps)(Chef)