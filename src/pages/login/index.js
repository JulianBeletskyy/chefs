import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import TextField from '../../components/inputs/TextField'
import BtnMain from '../../components/buttons/BtnMain'
import { login } from '../../actions/auth'
import { history } from '../../store'

const Login = () => {
  const [form, setForm] = useState({login: '', password: ''})
  const dispatch = useDispatch()
  const handleChange = (field, val) => {
    setForm({...form, [field]: val})
  }
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(login(form)).then(role => {
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
    })
  }
  return (
    <div className="row justify-content-center align-items-center h-100">
      <div className="col-md-6 col-lg-4">
        <form>
          <div className="card">
            <div className="card-title">
              Login
            </div>
            <TextField
              value={form.login}
              onChange={val => handleChange('login', val)}
              label="Email / Phone" />
            <TextField
              value={form.password}
              type="password"
              onChange={val => handleChange('password', val)}
              label="Password" />
            <div className="text-center">
              <BtnMain title="Login" onClick={handleSubmit} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login