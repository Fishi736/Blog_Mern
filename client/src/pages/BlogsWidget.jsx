import React from "react";
import { Link } from "react-router-dom";
import Author from "./Author";

const BlogsWidget = ({
  blogid,
  category,
  title,
  thumbnail,
  authorId,
  description,
  createdAt,
}) => {
  const shortDescription =
    description.length > 145
      ? description.substring(0, 145) + "..."
      : description;
  const shortTitle = title.length > 90 ? title.substring(0, 90) + "..." : title;

  return (
    <>
      <div className="row my-5 border-bottom p-3" blogid={blogid}>
        <Link to={`/blogs/${blogid}`} className="link row w-100">
          <div className="col-lg-3">
            <img
              className="d"
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`}
              alt={title}
              height={160}
              width={160}
            />
          </div>
          <div className="col-lg-9 ">
            <h5 className="mt-3">{shortTitle}</h5>
            <p dangerouslySetInnerHTML={{ __html: shortDescription}}></p>
          </div>
        </Link>

        <Author
          className="ms-auto"
          authorId={authorId}
          createdAt={createdAt}
          category={category}
        />
      </div>
    </>
  );
};

export default BlogsWidget;
