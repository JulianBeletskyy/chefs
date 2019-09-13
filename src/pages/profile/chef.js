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
	const [validate, setValidate] = useState({})
	const save = e => {
		e.preventDefault()
		dispatch(updateProfile(form))
			.then(success => {
				if (success) {
					setValidate({})
				}
			})
			.catch(({validate}) => {
				if (validate) {
					setValidate(validate)
				}
			})
	}
	const handleChange = (field, val) => {
		if (validate[field]) {
			setValidate({...validate, [field]: ''})
		}
		setForm({...form, [field]: val})
	}
	const handleChangeAddress = (address, lat = null, lng = null) => {
		const data = {
			...form,
			address,
			lat,
			lng,
		}
		setForm(data)
		setValidate({...validate, address: ''})
	}
	return (
		<div className="profile p-3 h-100">
			<div className="profile-title mb-3">
				Profile
			</div>
			<form>
				<div className="row">
					<div className="col-sm-6">
						<TextField
							isValid={!validate.firstName}
							errorMessage={validate.firstName}
							label="First name"
							value={form.firstName}
							onChange={val => handleChange('firstName', val)} />
						<TextField
							isValid={!validate.bussinesName}
							errorMessage={validate.bussinesName}
							label="Bussines name"
							value={form.bussinesName}
							onChange={val => handleChange('bussinesName', val)} />
						<TextField
							label="Phone"
							value={form.phone}
							onChange={val => handleChange('phone', val)} />
					</div>
					<div className="col-sm-6">
						<GoogleMap
							isValid={!validate.address}
							errorMessage={validate.address}
							onChange={handleChangeAddress}
							address={form.address}
							lat={form.lat}
							lng={form.lng} />
					</div>
					<div className="col-sm-12 text-center">
						<BtnMain title="Save" onClick={save} />
					</div>
				</div>
			</form>
		</div>
	)
}

const mapStateToProps = ({user}) => ({
	user: user.data
})

export default connect(mapStateToProps)(ChefProfile)