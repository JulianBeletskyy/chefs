const getName = key => (
	`${(key.charAt(0).toUpperCase()+key.slice(1)).split(/(?=[A-Z])/).join(' ')}`
)

const isRequired = fields => (
	Object.keys(fields).reduce((obj, key) => ({
			...obj,
			...!fields[key] ? {[key]: `${getName(key)} is required`} : null
	}), {})
)

const isValidEmail = email => ({
	...!(/\S+@\S+\.\S+/.test(email)) ? {email: 'Email is incorrect'} : null
})

const isSameFields = fields => {
	let prev = ''
	return Object.keys(fields).reduce((obj, key) => {
		obj = (fields[key] !== prev) ? {[key]: `${getName(key)} must be the same`} : {}
		prev = fields[key]
		return obj
	}, {})
}

const isValidAddress = (address, lat, lng) => {
	if (!address) {
		return {address: 'Address is required'}
	}
	if (!lat || !lng) {
		return  {address: 'Address must be selected from autocomplete'}
	}
	return {}
}

class Validation {
	constructor() {
		this.validate = {}
		this.isValid = this.isValid.bind(this)
		this.login = this.login.bind(this)
		this.signup = this.signup.bind(this)
		this.updateProfile = this.updateProfile.bind(this)
	}
	isValid() {
		return !Object.keys(this.validate).length
	}
	login(req, res, next) {
		this.validate = {}
		const { email, password } = req.body
		this.validate = {
			...this.validate,
			...isValidEmail(email),
			...isRequired({email, password}),
		}
		if (!this.isValid()) {
			return res.status(400).json({validate: this.validate})
		}
		next()
	}
	signup(req, res, next) {
		this.validate = {}
		const { firstName, bussinesName, email, password, confirmPassword, role } = req.body
		this.validate = {
			...this.validate,
			...isValidEmail(email),
			...isSameFields({password, confirmPassword}),
			...isRequired({email, password, confirmPassword, ...role === 'client' ? {firstName} : {bussinesName}}),
		}
		if (!this.isValid()) {
			return res.status(400).json({validate: this.validate})
		}
		next()
	}
	updateProfile(req, res, next) {
		this.validate = {}
		const { authUser } = req
		const { firstName, bussinesName, address, lat, lng } = req.body
		this.validate = {
			...isRequired({bussinesName, firstName}),
			...isValidAddress(address, lat, lng)
		}
		if (!this.isValid()) {
			return res.status(400).json({validate: this.validate})
		}
		next()
	}
}

export default Validation