import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
const AuthorList = () => {
  const [authorList, setAuthorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users`
        );
        setAuthorList(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchAuthors();
  }, []);

  return (
    <>
      <div className="container py-5 overflow-hidden">
        <div className="row gx-5">
          {authorList.map(
            ({ _id, name, email, blogs, country, avatar, mobile }) => (
              <div className="col" key={_id}>
                <Link to={`/author/${_id}`} style={{ textDecoration: "none" }}>
                  <div
                    className="user-card border rounded"
                    
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar})`,
                      backgroundSize: "cover",
                      height: "300px",
                    }}
                  >
                    <div className="content rounded p-3">
                      <div>
                        <span className="name">{name}</span>
                        <span className="email">{email}</span>
                      </div>
                      <div>
                        <span className="blogCount">{blogs}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default AuthorList;
