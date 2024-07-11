import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // ----------------- logout --------------//
  const logOut = () => {
    setCurrentUser(null);
    navigate("/");
  };

  // --------------------------------//

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white border-bottom 
"
      >
        <div className="container-fluid col-lg-11 col-12 mx-auto">
          <Link className="navbar-brand fw-semibold" to="/">
            Geeks
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ms-lg-4">
                <Link className="nav-link" to="/blogs">
                  Blogs
                </Link>
              </li>
              <li className="nav-item  ms-lg-4">
                <Link className="nav-link" to="/authors">Contributers</Link>
              </li>
              <li className="nav-item  ms-lg-4">
                <Link className="nav-link">About</Link>
              </li>
              <li className="nav-item  ms-lg-4">
                <Link className="nav-link">Contact Us</Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!currentUser?.id && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </li>
              )}
              {currentUser?.id && (
                <li className="nav-item">
                  <Link className="nav-link" to={`/author/${currentUser.id}`}>
                    My Profile
                  </Link>
                </li>
              )}
              {currentUser?.id && (
                <li className="nav-item" onClick={logOut}>
                  <Link className="nav-link" to="/login">
                    Log Out
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
