import React from 'react'
import { Logo } from '../../components/icons'

const Landing = () => {
	return (
		<div className="row justify-content-center align-items-center h-100">
			<div className="col-md-6 col-lg-4 text-center">
				<div>
					<Logo width={200} height={200} />
				</div>
				<div>
					<div className="logo-font landing-title">chefs & eaters</div>
				</div>

			</div>
		</div>
	)
}

export default Landing
