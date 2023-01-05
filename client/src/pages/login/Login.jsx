import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import './login.scss'

export default function Login() {

    const {login} = useContext(AuthContext)

    const handleLogin =()=>{
        login()
    }
    return (
        <div className='login'>
            <div className="card">
                <div className="left">
                    <h1>Hello World.</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur mque commodi natus dicta quaerat vero hic laborum asperiores illum iure, nulla quis nam.</p>
                    <span>Dont have an account?</span>
                    <Link to={'/register'}>
                    <button>Register</button>
                    </Link>

                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form >
                        <input type="email" placeholder='Email' />
                        <input type="password" placeholder='Password' />
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
