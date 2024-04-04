import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import FormInput from "./FormInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Create = () => {
  const [formResponses, setFormResponses] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const { id } = useParams();

  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    console.log(location?.pathname);

    if (location?.pathname.includes("edit")) {
      const getBlog = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/blogs/${id}`
          );
          setTitle(response.data.title);
          setCategory(response.data.category);
          setDescription(response.data.description);
        } catch (error) {
          console.log(error);
        }
      };
      getBlog();
    }
  }, []);

  const module = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const format = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const categories = [
    "Agricultural",
    "Bussiness",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Technology",
  ];

  const createBlog = async (e) => {
    e.preventDefault();

    const blogData = new FormData();
    blogData.set("title", title);
    blogData.set("category", category);
    blogData.set("description", description);
    blogData.set("thumbnail", thumbnail);

    try {
      if (!location?.pathname.includes("edit")) {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/blogs/create`,
          blogData,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status == 201) {
          return navigate("/blogs");
        }
      } else {
        const response = await axios.patch(
          `${process.env.REACT_APP_BASE_URL}/blogs/edit/${id}`,
          blogData,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status == 200) {
          return navigate("/blogs");
        }
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };



  return (
    <>
      <section className="d-flex justify-content-center p-lg-5 p-3">
        <div className="col-lg-8">
          <h2>Write your Imagination</h2>
          <form onSubmit={createBlog} className="mt-5">
            {error && (
              <p className="bg-danger-subtle border border-danger text-danger p-3">
                {error}
              </p>
            )}

            <div className="mb-4">
              <FormInput
                placeholder="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <select
                className="form-control"
                placeholder="Category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <ReactQuill
                className="ql-editor"
                modules={module}
                formats={format}
                value={description}
                onChange={setDescription}
              />
            </div>

            <div className="mb-4">
              <input
                type="file"
                name="thumbnail"
                onChange={(e) => setThumbnail(e.target.files[0])}
                accept="png,jpg,jpeg"
              />
            </div>

            <button className="btn btn-dark  px-5" type="submit">
              Save
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Create;
