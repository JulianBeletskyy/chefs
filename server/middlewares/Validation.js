class Validation {
	constructor() {
		this.validate = {}
		this.isValid = this.isValid.bind(this)
		this.login = this.login.bind(this)
	}
	isValid() {
		return !Object.keys(this.validate).length
	}
	login(req, res, next) {
		this.validate = {}
		const { email, password } = req.body
		if (!(/\S+@\S+\.\S+/.test(email))) {
			this.validate.email = 'Email is incorrect'
		}
		if (!email) {
			this.validate.email = 'Email is required'
		}
		if (!password) {
			this.validate.password = 'Password is required'
		}
		if (!this.isValid()) {
			return res.status(400).json({validate: this.validate})
		}
		
		next()
	}
}

export default Validation