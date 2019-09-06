import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import TextField from '../../components/inputs/TextField'
import BtnMain from '../../components/buttons/BtnMain'
import Link from '../../components/buttons/Link'
import { signup } from '../../actions/auth'
import cn from 'classnames'
import { history } from '../../store'
import './signup.css'

const clientStruct = {
	firstName: '',
	login: '',
	password: '',
	confirmPassword: ''
}

const chefStruct = {
	bussinesName: '',
	login: '',
	password: '',
	confirmPassword: ''
}

const Signup = () => {
	const [form, setForm] = useState({type: 'client', client: clientStruct, chef: chefStruct})
	const dispatch = useDispatch()
	const changeForm = type => () => {
		setForm({...form, type})
	}
	const handleChange = (field, val) => {
		setForm({
			...form,
			[form.type]: {...form[form.type], [field]: val}
		})
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		const data = {
			...form[form.type],
			role: form.type,
		}
		dispatch(signup(data)).then(role => {
			switch (role) {
				case 'client':
					history.push('/chefs'); break
				case 'chef':
					history.push('/dashboard'); break
				default:
					return
			}
		})
	}
	const { client, chef } = form
	return (
		<div className="row justify-content-center align-items-center h-100">
			<div className="col-md-6 col-lg-4">
				<div className={cn('wrap-rotate-sides', {chef: form.type === 'chef'})}>
					<form className="client-signup" autoComplete="disabled">
						<div className="card">
							<div className="card-title">
								Signup Eater
							</div>
							<TextField
								label="Email / Phone"
								onChange={val => handleChange('login', val)}
								value={client.login} />
							<TextField
								label="First Name"
								onChange={val => handleChange('firstName', val)}
								value={client.firstName} />
							<TextField
								type="password"
								label="Password"
								onChange={val => handleChange('password', val)}
								value={client.password} />
							<TextField
								type="password"
								label="Confirm Password"
								onChange={val => handleChange('confirmPassword', val)}
								value={client.confirmPassword} />
							<div className="text-center mb-3">
								<BtnMain title="Sign Up" onClick={handleSubmit} />
							</div>
							<div className="text-center">
								<Link onClick={changeForm('chef')} title="Signup as Chef" />
							</div>
						</div>
					</form>
					<div className="chef-signup">
						<div className="card">
							<div className="card-title text-right">
								Signup Chef
							</div>
							<TextField
								label="Business Name"
								onChange={val => handleChange('bussinesName', val)}
								value={chef.bussinesName} />
							<TextField
								label="Email / Phone"
								onChange={val => handleChange('login', val)}
								value={chef.login} />
							<TextField
								type="password"
								label="Password"
								onChange={val => handleChange('password', val)}
								value={chef.password} />
							<TextField
								type="password"
								label="Confirm Password"
								onChange={val => handleChange('confirmPassword', val)}
								value={chef.confirmPassword} />
							<div className="text-center mb-3">
								<BtnMain title="Sign Up" onClick={handleSubmit} />
							</div>
							<div className="text-center">
								<Link onClick={changeForm('client')} title="Signup as Eater" />
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	)
}

export default Signup