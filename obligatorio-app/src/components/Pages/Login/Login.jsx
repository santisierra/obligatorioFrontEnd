import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";


import logo from "../../calories_logo.png";
import "./Login.css";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

//Estructura login
const Login = ({ toggleSignup }) => {
  const navigator = useNavigate();

  const userLogged = useSelector((store) => store.userSlice.userLogged);

  useEffect(()=> {
    if(userLogged){
      navigator("/dashboard");

    }
  }
  )

  const signup = () => {
    navigator("/signup");//
  };
  return (
    <>
      <section className="d-flex flex-md justify-content-center login">
        <div className="card">
          <img src={logo} width="70" height="70" alt="Logo" />
          <h3>Control Calorias</h3>
          <section className="card-body">
          <LoginForm />
            <br />
            <a href="#" onClick={signup}>No tienes cuenta?</a>
          </section>
        </div>
      </section>
    </>
  );
};

export default Login;
