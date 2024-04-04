import React, { useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Login = () => {

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);




  const handleInput = (e) => {
    setUserInfo((prevState) => {
      console.log(e.target.value);
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };




  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`,userInfo);
      const user = await response.data;
      setCurrentUser(user)
      navigate('/blogs')
      
    } catch (error) {
      setError(error.response.data.message)
    }
  };









  return (
    <>
      <div className="container d-flex flex-wrap justify-content-center align-items-center h-100 p-lg-5 p-3">
        <main className="form-signin col-lg-4 col-10 mx-auto">
          <form onSubmit={loginUser}>
            <h1 className=" mb-3 fw-bold">Log In</h1>

            {error && (
              <p className="bg-danger-subtle border border-danger text-danger p-3">
                {error}
              </p>
            )}

            <input
              type="email"
              name="email"
              className="form-control mb-4"
              placeholder="name@example.com"
              value={userInfo.email}
              onChange={handleInput}
            />
            <input
              type="password"
              name="password"
              className="form-control mb-4"
              placeholder="Password"
              value={userInfo.password}
              onChange={handleInput}
            />

            <label className="mb-4">
              <input type="checkbox" value="remember-me" /> Remember me
            </label>

            <button className="w-100 btn btn-dark" type="submit">
              Log in
            </button>
            <p className="mt-3">
              Don't have an account?<Link to={"/register"}>Join Us</Link>{" "}
            </p>
          </form>
        </main>
        <img
          className="mb-4 img-fluid"
          src="https://img.freepik.com/free-vector/access-control-system-abstract-concept-vector-illustration-security-system-authorize-entry-login-credentials-electronic-access-password-passphrase-pin-verification-abstract-metaphor_335657-5746.jpg?t=st=1710623543~exp=1710627143~hmac=3c2b4c4b7fd013239ff8c77678b37433745dc5c8a34504d0cd89f7abec9536bf&w=1060"
          alt="logo"
          width="500"
        />
      </div>
    </>
  );
};

export default Login;
