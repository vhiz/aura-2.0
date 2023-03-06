import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import Google from "../../assets/google.png";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login, loginGoogle } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    const google = await signInWithPopup(auth, provider);
    const info = {
      name: google.user.displayName,
      email: google.user.email,
      profilePic: google.user.photoURL,
      username: google.user.displayName,
    };
    try {
      setLoading(true);
      await loginGoogle(info);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }

    setLoading(false);
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur mque commodi natus dicta
            quaerat vero hic laborum asperiores illum iure, nulla quis nam.
          </p>
          <span>Dont have an account?</span>
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="name"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            <button onClick={handleLogin}>Login</button>
          </form>
          {loading ? (
            <CircularProgress />
          ) : (
            <div className="google" onClick={handleGoogle}>
              <img src={Google} alt="" /> Sigin with Google
            </div>
          )}
        </div>
        {error && error}
      </div>
    </div>
  );
}
