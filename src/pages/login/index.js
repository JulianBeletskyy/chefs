import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import TextField from '../../components/inputs/TextField'
import BtnMain from '../../components/buttons/BtnMain'
import { login } from '../../actions/auth'
import { history } from '../../store'

const Login = () => {
  const [form, setForm] = useState({email: '', password: ''})
  const [validate, setValidate] = useState({email: '', password: ''})
  const dispatch = useDispatch()
  const handleChange = (field, val) => {
    setForm({...form, [field]: val})
    if (validate[field]) {
      setValidate({...validate, [field]: ''})
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(login(form)).then(({role}) => {
      switch (role) {
        case 'client':
          history.push('/chefs'); break
        case 'chef':
          history.push('/dashboard'); break
        case 'admin':
          history.push('/admin'); break
        default:
          return
      }
    }).catch(({validate}) => {
      setValidate(validate)
    })
  }
  return (
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-title">
              Login
            </div>
            <form>
              <TextField
                isValid={!validate.email}
                errorMessage={validate.email}
                value={form.email}
                onChange={val => handleChange('email', val)}
                label="Email" />
              <TextField
                isValid={!validate.password}
                errorMessage={validate.password}
                value={form.password}
                type="password"
                onChange={val => handleChange('password', val)}
                label="Password" />
              <div className="text-center">
                <BtnMain title="Login" onClick={handleSubmit} />
              </div>
            </form>
          </div>
      </div>
    </div>
  )
}

export default Login