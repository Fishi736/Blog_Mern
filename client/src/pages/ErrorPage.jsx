import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className="container p-5">
        <div className="bg-light col-lg-6 col-10 m-auto text-center p-5 rounded">
          <p>Not Found</p>
          <Link to={"/"}>
            <button className="btn btn-dark">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
