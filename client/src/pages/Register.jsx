import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handelChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handelSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/auth/register', inputs)
      console.log('res', res.data)
      navigate('/login')
    } catch (error) {
      console.log('error', error)
      setError(error.response.data)
    }
  }

  setTimeout(() => {
    error && setError(null)
  }, 5000)

  return (
    <div className="register">

      <h4>Reister</h4>
      <form onSubmit={handelSubmit}>
        <input required type="text" name="name" placeholder='name' onChange={handelChange} />
        <input required type="email" name="email" placeholder='email' onChange={handelChange} />
        <input required type="password" name="password" placeholder='password' onChange={handelChange} />
        <button type='submit'>Register</button>
        <p>{error && error}</p>
        <span>I already have a compte? <Link to='/login'>Login</Link></span>
      </form>
    </div>
  )
}

export default Register
