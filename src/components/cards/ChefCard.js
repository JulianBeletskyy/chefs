import React from 'react'
import Slider from '../slider'
import './cards.css'

const ChefCard = ({firstName, bussinesName, address, lat, lng, phone, distance, meals, onClick}) => {
	return (
		<div className="chef-card d-flex flex-column" onClick={onClick}>
			<div className="chef-image">
				<Slider items={meals} />
				<div className="chef-card-name">
					{bussinesName}
				</div>
			</div>
			<div className="chef-card-body">
				<strong>Address: </strong>
				{address}
			</div>
			<div className="chef-card-footer text-right mt-auto">
				<strong>Distance: </strong>
				{distance === null ? `Not defined` : `${distance} km`}
			</div>
		</div>
	)
}

export default ChefCard