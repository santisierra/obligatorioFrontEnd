/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logo from "../../../calories_logo.png";
import "./Header.css";
import NavBar from "./NavBar";
import Profile from "./Logout";
import { useDispatch } from "react-redux";
import { onLogout } from "../../../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";


const Header = () => {
  const dispatcher = useDispatch();
  const navigator = useNavigate();

  const _onLogOut = () => {
    navigator("/login");//
    dispatcher(onLogout());
  };

  return (
    <header className="App-header "style={{ marginBottom: "40px" }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
    
        <div className="container col-9" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            Control Calorias
          </a>
          <div className="ml-auto">
          <Profile onLogOut={_onLogOut} />
          </div>
          
        </div>
      </nav>
    </header>
  );
};

export default Header;

/*     <NavBar />


<button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>*/