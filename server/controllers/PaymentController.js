import dwolla from 'dwolla-v2'

const client = new dwolla.Client({
  	key: 'Vt4rGcTxdUv2dHhlKtIHprYXNtUgptv1ajDI7tFy73wexcdb6H',
  	secret: 'yEVrC7i4OSlVnSvHTIOfGPEjb3eXFb3aJEyiSviiYAFF4mKdUs',
  	environment: 'sandbox',
})
const appToken = new client.Token({access_token: 'Q0jaHfCkqFFdW1i82FrTUGUxD4bWQYOTBMc2unFfeylE5mlKGo'})

const createCustomer = async (req, res) => {
	
	var requestBody = {
  		firstName: 'Jane',
  		lastName: 'Merchant',
  		email: 'jmerchant@nomail.net',
	}

	await appToken.post('customers', requestBody).then(res => {
		return res.status(200).json({data: res})
	    // res.headers.get('location'); // => 'https://api-sandbox.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747'
  	}).catch(error => {
  		return res.status(400).json({data: error})
  	})

	console.log(appToken)
	return res.status(200).json({data: appToken})
}

const createCutomerToken = async (req, res) => {
	const { customerId } = req.body
	const customerUrl = `https://api-sandbox.dwolla.com/customers/${customerId}`
	await appToken.post(`${customerUrl}/iav-token`).then(result => {
		return res.status(200).json({token: result.body.token})
	})
}

const customerSources = async (req, res) => {
	const { customerId } = req.params
	const customerUrl = `https://api-sandbox.dwolla.com/customers/${customerId}`
	console.log(customerUrl)
	await appToken.get(`${customerUrl}/funding-sources`).then(result => {
		// res.body._embedded['funding-sources'][0].name
		return res.status(200).json({data: result.body._embedded['funding-sources']})
	})
}

export default {
	createCustomer,
	createCutomerToken,
	customerSources,
}