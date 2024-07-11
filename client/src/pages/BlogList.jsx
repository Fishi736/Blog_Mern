import React, { useEffect, useState } from "react";
import BlogsWidget from "./BlogsWidget";
import Loader from "../components/Loader";
import axios from "axios";
import Search from "../components/Search";

const BlogList = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/blogs`
        );
        setList(response?.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container py-5">
       
       <Search/>

        <div className="row g-5">
          <div className="col-md-8">
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

          <div className="col-md-4">
            <div className="position-sticky" style={{ top: "2rem" }}>
              <div className="p-4 mb-3 bg-body-tertiary rounded">
                <h4 className="fst-italic">About</h4>
                <p className="mb-0">
                  Customize this section to tell your visitors a little bit
                  about your publication, writers, content, or something else
                  entirely. Totally up to you.
                </p>
              </div>

              <div>
                <h4 className="fst-italic">Recent posts</h4>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
                      href="#"
                    >
                      <svg
                        className="bd-placeholder-img"
                        width="100%"
                        height="96"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                      >
                        <rect width="100%" height="100%" fill="#777"></rect>
                      </svg>
                      <div className="col-lg-8">
                        <h6 className="mb-0">Example blog post title</h6>
                        <small className="text-body-secondary">
                          January 15, 2024
                        </small>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
                      href="#"
                    >
                      <svg
                        className="bd-placeholder-img"
                        width="100%"
                        height="96"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                      >
                        <rect width="100%" height="100%" fill="#777"></rect>
                      </svg>
                      <div className="col-lg-8">
                        <h6 className="mb-0">
                          This is another blog post title
                        </h6>
                        <small className="text-body-secondary">
                          January 14, 2024
                        </small>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
                      href="#"
                    >
                      <svg
                        className="bd-placeholder-img"
                        width="100%"
                        height="96"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        preserveAspectRatio="xMidYMid slice"
                        focusable="false"
                      >
                        <rect width="100%" height="100%" fill="#777"></rect>
                      </svg>
                      <div className="col-lg-8">
                        <h6 className="mb-0">
                          Longer blog post title: This one has multiple lines!
                        </h6>
                        <small className="text-body-secondary">
                          January 13, 2024
                        </small>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default BlogList;
