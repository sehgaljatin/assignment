import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const Navbar = (props) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="./images/Myntra-logo.png"
              style={{ width: "60px" }}
              alt=""
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav margin_right_15">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  MEN
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  WOMEN
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  WATCHES
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  CLOTHING
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  FOOTWEAR
                </a>
              </li>
            </ul>
            <div className="d-flex">
              <input
                className="form-control search ml-5"
                type="search"
                placeholder="Search Products"
                aria-label="Search"
                onChange={props.onChange}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
