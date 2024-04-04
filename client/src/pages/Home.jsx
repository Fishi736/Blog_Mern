import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <main>
        <div className="position-relative overflow-hidden p-3 p-md-5  text-center bg-light">
          <div className="col-md-5 p-lg-5 mx-auto my-5">
            <h1 className="display-3 text-dark fw-bold mb-3">Punny headline</h1>
            <p className="lead fw-normal text-black-50 mb-4">
              And an even wittier subheading to boot. Jumpstart your marketing
              efforts with this example based on Apple’s marketing pages.
            </p>
            <Link className="btn bg-dark text-white mb-5" to="/blogs">
              Explore More
            </Link>
          </div>

          <div className="product-device shadow-sm d-none d-md-block"></div>
          <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
        </div>
      </main>
      <section className="pb-5">
        <div
          className="col-lg-8 col-10 bg-secondary-subtle  bg-opacity-50 rounded p-lg-5 p-3 mx-auto card mb-5"
          style={{ marginTop: "-3rem" }}
        >
          <h2>Lorem ipsum dolor sit.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            nemo illo nobis distinctio sed sapiente quos enim saepe doloremque
            magni magnam exercitationem veniam maxime ipsam voluptas iusto fugit
            iure asperiores.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
