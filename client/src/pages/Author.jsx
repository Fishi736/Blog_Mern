import React, { useEffect, useState,useContext } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const Author = ({ authorId, createdAt, category }) => {
  const [author, setAuthor] = useState({});
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${authorId}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-end align-items-center">
        <div className="border-end px-2">
          <span className="category">{category}</span>
        </div>

        <div className="border-end px-2">
          <span className="date text-muted">
            <ReactTimeAgo
              date={new Date(createdAt)}
              locale="en-US"
            ></ReactTimeAgo>
          </span>
        </div>

      { currentUser?.id !== authorId &&  <div className="float-end px-2 ">
          <img
            className="img-fluid rounded-circle me-2"
            width={20}
            height={20}
            src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`}
          />
          <span className="text-muted">{author?.name} </span>
        </div>}
      </div>
    </>
  );
};

export default Author;
