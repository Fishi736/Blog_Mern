import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import BlogsWidget from "./BlogsWidget";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";

const AuthorDetails = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  // let current_id = currentUser?.id;
  const token = currentUser?.token;
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [interest, setInterest] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/blogs/users/${id}`
        );
        setList(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    const getUser = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const { name, email, avatar, about, interest, country, mobile } =
        response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
      setAbout(about);
      setInterest(interest);
      setCountry(country);
      setMobile(mobile);
    };
    getUser();
    fetchBlogs();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 order-2">
            {currentUser?.id == id && (
              <Link
                className=" link mt-3 ms-auto badge fs-6 fw-normal rounded-pill bg-light text-dark "
                to="/create"
              >
                + Create New
              </Link>
            )}
            {list.length > 0 ? (
              <>
                {list.map(
                  ({
                    _id,
                    thumbnail,
                    category,
                    title,
                    description,
                    creator,
                    createdAt,
                  }) => (
                    <BlogsWidget
                      key={_id}
                      blogid={_id}
                      thumbnail={thumbnail}
                      category={category}
                      title={title}
                      description={description}
                      authorId={creator}
                      createdAt={createdAt}
                    />
                  )
                )}
              </>
            ) : (
              <p> No Data Found</p>
            )}
          </div>

          <div className="col-lg-4 border-end order-1">
            <div
              className="userDetails px-lg-5 px-3 position-sticky"
              style={{ top: "2rem" }}
            >
              <div className=" d-flex justify-content-between">
                <div className=" profile-pic w-50 rounded-circle mt-5 mb-4 ">
                  <img
                    className="img-fluid rounded-circle"
                    src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                    alt="dp"
                  />
                </div>
                <div>
                  {currentUser?.id == id && (
                    <Link
                      className=" link mt-3 ms-auto badge fs-6 fw-normal rounded-pill bg-light text-dark "
                      to={`/profile/${currentUser.id}`}
                    >
                      Edit
                    </Link>
                  )}
                </div>
              </div>

              <h2>{name}</h2>
              <p className="mb-1">{email}</p>
              <p className="mt-0">{mobile}</p>
              <p>{about}</p>
              <span className="badge rounded-pill bg-light text-dark me-3">
                {interest}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorDetails;
