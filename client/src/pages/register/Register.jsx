
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './register.scss'
import axios from 'axios'

export default function Register() {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    phoneno: "",
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()


  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3001/auth/register', inputs)
      navigate('/login')

    } catch (error) {
      setError(error.response.data)
    }

  }
  return (
    <div className='register'>
      <div className="card">
        <div className="left">
          <h1>Aura</h1>
          <p>Lorem ipsum dolor sit amet, consectetur mque commodi natus dicta quaerat vero hic laborum asperiores illum iure, nulla quis nam.</p>
          <span> Have an account?</span>
          <Link to={'/login'}>
            <button>Login</button>
          </Link>

        </div>
        <div className="right">
          <h1>Register</h1>
          <form >
            <input type="email" placeholder='Email' required name='email' onChange={handleChange} />
            <input type="text" placeholder='Username' required name='username' onChange={handleChange} />
            <input type="text" placeholder='Name' required name='name' onChange={handleChange} />
            <input type="tel" placeholder='Phone' required name='phoneno' onChange={handleChange} />
            <input type="password" placeholder='Password' required name='password' onChange={handleChange} />
            <button onClick={handleClick}>Register</button>
            {error && error}
          </form>
        </div>
      </div>
    </div>
  )
}
