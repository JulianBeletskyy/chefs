import React, { useState } from 'react'
import { connect } from 'react-redux'
import GoogleMap from '../../components/map'
import TextField from '../../components/inputs/TextField'
import BtnMain from '../../components/buttons/BtnMain'
import { updateProfile } from '../../actions/user'
import './profile.css'

const ChefProfile = ({dispatch, user}) => {
	const [form, setForm] = useState({
		firstName: user.firstName,
		bussinesName: user.bussinesName,
		phone: user.phone,
		address: user.address,
		lat: user.lat,
		lng: user.lng,
	})
	const save = () => {
		dispatch(updateProfile(form))
	}
	const handleChange = (field, val) => {
		setForm({...form, [field]: val})
	}
	const handleChangeAddress = (address, lat, lng) => {
		const data = {
			...form,
			address,
			...lat ? {lat} : null,
			...lng ? {lng} : null
		}
		setForm(data)
	}
	console.log(form)
	return (
		<div className="profile h-100">
			<div className="profile-title">
				Profile
			</div>
			<div className="row">
				<div className="col-sm-6">
					<TextField
						label="First name"
						value={form.firstName}
						onChange={val => handleChange('firstName', val)} />
					<TextField
						label="Bussines name"
						value={form.bussinesName}
						onChange={val => handleChange('bussinesName', val)} />
					<TextField
						label="Phone"
						value={form.phone}
						onChange={val => handleChange('phone', val)} />
				</div>
				<div className="col-sm-6">
					<GoogleMap onChange={handleChangeAddress} address={form.address} lat={form.lat} lng={form.lng} />
				</div>
				<div className="col-sm-12 text-center">
					<BtnMain title="Save" onClick={save} />
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = ({user}) => ({
	user: user.data
})

export default connect(mapStateToProps)(ChefProfile)