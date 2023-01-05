
import { Link } from 'react-router-dom'
import './register.scss'

export default function Register() {
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
            <input type="email" placeholder='Email' />
            <input type="text" placeholder='Username' />
            <input type="text" placeholder='Name' />
            <input type="tel" placeholder='Phone' />
            <input type="password" placeholder='Password' />
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}
