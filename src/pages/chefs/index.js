import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getChefs } from '../../actions/chefs'
import ChefCard from '../../components/cards/ChefCard'
import { history } from '../../store'
import './chefs.css'

const Chefs = ({dispatch, chefs}) => {
	useEffect(() => {
		dispatch(getChefs())
	}, [])
	const goToChef = chefId => () => {
		history.push(`/chef/${chefId}`)
	}
	return (
		<div className="chefs h-100">
			<div className="row">
				{
					chefs.map((chef, i) => <div key={i} className="col-sm-3"><ChefCard {...chef} onClick={goToChef(chef.userId)} /></div>)
				}
			</div>
		</div>
	)
}

const mapStateToProps = ({chefs}) => ({
	chefs: chefs.list,
})

export default connect(mapStateToProps)(Chefs)