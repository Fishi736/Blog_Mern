import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [interest, setInterest] = useState("");
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${currentUser?.id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const { name, email, avatar ,about, interest, country, mobile } = response.data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
      setAbout(about);
      setInterest(interest);
      setCountry(country);
      setMobile(mobile);
    };
    getUser();
  }, []);

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      setAvatar(response?.data.avatar);
    } catch (error) {
      setError(error);
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("mobile", mobile);
      userData.set("about", about);
      userData.set("country", country);
      userData.set("interest", interest);
      userData.set("country", country);

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-details`,
        userData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status == 200) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message)
    }
  };

  return (
    <div className="container p-lg-5">
      <div className="col-xl-9 mx-auto">
        <img
          src="https://mizzle.webestica.com/assets/images/bg/02.jpg"
          alt="banner"
          className="rounded img-fluid "
        />

        <div className="row " style={{ marginTop: "-8rem" }}>
          <div className="col-9 rounded mx-auto bg-white p-lg-5 p-3 card">
            <div className="wrapper ">
              <h2 className="pb-4 border-bottom">Profile settings</h2>
              {error && (
                <p className="bg-danger-subtle border border-danger text-danger p-3">
                  {error}
                </p>
              )}
              <div className="d-flex row align-items-start py-3 border-bottom">
                <div className="col-4 avatar-upload">
                  <div className="avatar-edit">
                    <form>
                      <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={(e) => setAvatar(e.target.files[0])}
                        accept="png,jpg,jpeg"
                      />
                      <label
                        htmlFor="avatar"
                        onClick={() => setIsAvatarTouched(true)}
                      >
                        Edit
                      </label>
                    </form>
                    {isAvatarTouched && (
                      <button
                        className="profile__Avatar_btn"
                        onClick={changeAvatarHandler}
                      >
                        Upload
                      </button>
                    )}
                  </div>
                  <div className="avatar-preview">
                    <img
                      className="img-fluid"
                      id="imagePreview"
                      src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                    ></img>
                  </div>
                </div>

                <div className="col-md-8 col-12 ps-3 py-2">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-light form-control"
                    placeholder="Steve"
                  />
                </div>
              </div>

              <form className="py-2" onSubmit={updateUserDetails}>
                <div className="row py-2">
                  <div className="col-md-12">
                    <label>About</label>
                    <textarea
                      type="text"
                      name="about"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="bg-light form-control textArea"
                      placeholder="About Yourself ..."
                    />
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-md-6">
                    <label>Email Address</label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-light form-control"
                      placeholder="steve_@email.com"
                    />
                  </div>
                  <div className="col-md-6 pt-md-0 pt-3">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="bg-light form-control"
                      placeholder="+1 213-548-6015"
                    />
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-md-6">
                    <label>Country</label>
                    <select
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      id="country"
                      className="bg-light form-control"
                    >
                      <option value="india" defaultValue={"India"}>
                        India
                      </option>
                      <option value="usa">USA</option>
                      <option value="uk">UK</option>
                      <option value="uae">UAE</option>
                    </select>
                  </div>
                  <div className="col-md-6 pt-md-0 pt-3" id="lang">
                    <label>Language</label>
                    <div className="arrow">
                      <select
                        name="interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        id="language"
                        className="bg-light form-control"
                      >
                        <option value="english" defaultValue={"English"}>
                          English
                        </option>
                        <option value="english_us">
                          English (United States)
                        </option>
                        <option value="enguk">English UK</option>
                        <option value="arab">Arabic</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="py-3 pb-4 border-bottom">
                  <button className="btn btn-dark me-3">Save Changes</button>
                  <button className="btn border button">Cancel</button>
                </div>
                <div
                  className="d-sm-flex align-items-center pt-3"
                  id="deactivate"
                >
                  <div>
                    <b>Deactivate your account</b>
                    <p>Details about your company account and password</p>
                  </div>
                  <div className="ms-auto">
                    <button className="btn danger" type="submit">
                      Deactivate
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
