// import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const errorsCommings = useLocation().state?.error
  useEffect(() => {
    setErrorMessage(errorsCommings)
  }, [])

  const handelChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const handelSubmit = async e => {
    e.preventDefault()
    try {
      // const res = await axios.post('http://localhost:3000/auth/login', inputs,
      //  { withCredentials: true }) // necesary for using cookies
      // console.log('res login', res.data)
      await login(inputs)
      navigate('/')
    } catch (error) {
      setError(error.response.data)
    }
  }

  setTimeout(() => {
    error && setError(null)
    errorMessage && setErrorMessage(null)
  }, 5000)

  return (
    <div className="login">
      <h4>Login Space</h4>
      <form onSubmit={handelSubmit}>
        <p>{errorMessage && errorMessage}</p>

        <input required type="email" name="email" placeholder="email" onChange={handelChange} />
        <input required type="password" name="password" placeholder="password" onChange={handelChange} />
        <button>Login</button>
        <p>{error && error}</p>
        <span>I havent a compte? <Link to='/register' >Register</Link></span>
      </form>

    </div>
  )
}

export default Login
