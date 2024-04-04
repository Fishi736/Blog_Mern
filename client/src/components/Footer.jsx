import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer mt-auto py-5 px-3 bg-light ">
        <div className="row g-4 justify-content-between pt-5 mx-auto col-lg-11 col-12 ">
          <div className="col-lg-3 ">
            <a className="me-0" href="index.html">
              <img
                className="light-mode-item h-40px"
                src="assets/images/logo.svg"
                alt="logo"
              />
              <img
                className="dark-mode-item h-40px"
                src="assets/images/logo-light.svg"
                alt="logo"
              />
            </a>

            <p className="mt-4 mb-2">
              A Bootstrap theme that's both stylish and functional, perfect for
              any type of technology or corporate website.
            </p>
          </div>

          <div className="col-lg-8 col-xxl-7">
            <div className="row g-4">
              <div className="col-6 col-md-4">
                <h6 className="mb-2 mb-md-4">Important</h6>

                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="contact-v1.html">
                      Become a partner
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="sign-in.html">
                      Sign in
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="sign-up.html">
                      Sign up
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-6 col-md-4">
                <h6 className="mb-2 mb-md-4">Quick links</h6>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link pt-0" href="about-v1.html">
                      About us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="contact-v1.html">
                      Contact us
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="career.html">
                      Blogs
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-md-4">
                <h6 className="mb-2 mb-md-4">Community</h6>
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link" href="faq.html">
                      Faqs
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Privacy Policy
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Terms &amp; condition
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
