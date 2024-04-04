import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUserInfo((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        userInfo
      );
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        setError("Couldn't register user. Please try again");
      }
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <>
      <div className="container d-flex flex-wrap justify-content-center align-items-center h-100 p-lg-5 p-3">
        <img
          className="mb-4 img-fluid "
          src="https://img.freepik.com/free-vector/stay-home-abstract-concept-vector-illustration-forced-isolation-covid19-outbreak-prevention-measures-social-distance-governmental-support-self-protection-wear-mask-abstract-metaphor_335657-6164.jpg"
          alt="logo"
          width={500}
        />
        <main className="form-signin col-lg-4 col-10 mx-auto">
          <form onSubmit={registerUser}>
            <h1 className="h1 mb-3 fw-bold">Join Us</h1>
            {error && (
              <p className="bg-danger-subtle border border-danger text-danger p-3">
                {error}
              </p>
            )}

            <input
              type="text"
              className="form-control mb-4"
              name="name"
              placeholder="Enter Your Name"
              value={userInfo.name}
              onChange={handleInput}
            />
            <input
              className="form-control mb-4"
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={userInfo.email}
              onChange={handleInput}
            />
            <input
              className="form-control mb-4"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={userInfo.password}
              onChange={handleInput}
            />
            <input
              className="form-control mb-4"
              type="password"
              name="password2"
              placeholder="Confirm password"
              value={userInfo.password2}
              onChange={handleInput}
            />
            <button className="w-100 btn btn-dark p-3" type="submit">
              Sign in
            </button>
            <p className="mt-3">
              Already have an account?<Link to={"/login"}>Log In</Link>{" "}
            </p>
          </form>
        </main>
      </div>
    </>
  );
};

export default Register;
