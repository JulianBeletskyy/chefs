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
	email: '',
	password: '',
	confirmPassword: ''
}

const chefStruct = {
	bussinesName: '',
	email: '',
	password: '',
	confirmPassword: ''
}

const Signup = () => {
	const [form, setForm] = useState({type: 'client', client: clientStruct, chef: chefStruct})
	const [validate, setValidate] = useState({})
	const dispatch = useDispatch()
	const changeForm = type => () => {
		setForm({...form, type})
		setValidate({})
	}
	const handleChange = (field, val) => {
		setForm({
			...form,
			[form.type]: {...form[form.type], [field]: val}
		})
	}
	const handleSubmit = e => {
		e.preventDefault()
		const data = {
			...form[form.type],
			role: form.type,
		}
		dispatch(signup(data))
			.then(({role}) => {
				switch (role) {
					case 'client':
						history.push('/chefs'); break
					case 'chef':
						history.push('/dashboard'); break
					default:
						return
				}
			})
			.catch(({validate}) => {
				setValidate(validate)
			})
	}
	const { client, chef } = form
	return (
		<div className="row justify-content-center align-items-center h-100">
			<div className="col-md-6 col-lg-4">
				<div className={cn('wrap-rotate-sides', {chef: form.type === 'chef'})}>
					<div className="client-signup" autoComplete="disabled">
						<div className="card">
							<div className="card-title">
								Signup Eater
							</div>
							<form>
								<TextField
									isValid={!validate.email}
									errorMessage={validate.email}
									label="Email"
									onChange={val => handleChange('email', val)}
									value={client.email} />
								<TextField
									isValid={!validate.firstName}
									errorMessage={validate.firstName}
									label="First Name"
									onChange={val => handleChange('firstName', val)}
									value={client.firstName} />
								<TextField
									isValid={!validate.password}
									errorMessage={validate.password}
									type="password"
									label="Password"
									onChange={val => handleChange('password', val)}
									value={client.password} />
								<TextField
									isValid={!validate.confirmPassword}
									errorMessage={validate.confirmPassword}
									type="password"
									label="Confirm Password"
									onChange={val => handleChange('confirmPassword', val)}
									value={client.confirmPassword} />
								<div className="text-center mb-3">
									<BtnMain title="Sign Up" onClick={handleSubmit} />
								</div>
							</form>
							<div className="text-center">
								<Link onClick={changeForm('chef')} title="Signup as Chef" />
							</div>
						</div>
					</div>
					<div className="chef-signup">
						<div className="card">
							<div className="card-title text-right">
								Signup Chef
							</div>
							<form>
								<TextField
									isValid={!validate.bussinesName}
									errorMessage={validate.bussinesName}
									label="Business Name"
									onChange={val => handleChange('bussinesName', val)}
									value={chef.bussinesName} />
								<TextField
									isValid={!validate.email}
									errorMessage={validate.email}
									label="Email"
									onChange={val => handleChange('email', val)}
									value={chef.email} />
								<TextField
									isValid={!validate.password}
									errorMessage={validate.password}
									type="password"
									label="Password"
									onChange={val => handleChange('password', val)}
									value={chef.password} />
								<TextField
									isValid={!validate.confirmPassword}
									errorMessage={validate.confirmPassword}
									type="password"
									label="Confirm Password"
									onChange={val => handleChange('confirmPassword', val)}
									value={chef.confirmPassword} />
								<div className="text-center mb-3">
									<BtnMain title="Sign Up" onClick={handleSubmit} />
								</div>
							</form>
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