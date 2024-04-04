import React, { useContext, useState, useEffect } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/userContext";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [authorID, setAuthorId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const token = currentUser?.token;

  useEffect(() => {
    const getBlog = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/blogs/${id}`
        );
        setBlog(response.data);
        setAuthorId(response.data.creator);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    getBlog();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const deleteBlog = async (e)=>{
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/blogs/delete/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.status == 200) {
        return navigate("/blogs");
      }
      
    } catch (error) {
      console.log("Couldn't delete post")
    }
  }

  return (
    <>
      <div className="container">
        <div className="col-md-8 pt-5">
          <article className="blog-post">
            <div className="d-flex justify-content-between">
              <h2 className="blog-post-title mb-5">{blog?.title}</h2>

              {currentUser?.id == blog?.creator && (
                <div className="buttonContainer">
                  <Link to={`/edit/${id}`} className="link mt-3 ms-auto btn fs-6 fw-normal  bg-dark text-light me-3">
                    Edit
                  </Link>
                  <button
                    onClick={deleteBlog}
                    className="link mt-3 ms-auto btn fs-6 fw-normal  bg-light text-darklink"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <img
              className="img-fluid mb-4"
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${blog?.thumbnail}`}
              alt={blog?.title}
            />

            <p dangerouslySetInnerHTML={{ __html: blog?.description }}></p>
          </article>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
