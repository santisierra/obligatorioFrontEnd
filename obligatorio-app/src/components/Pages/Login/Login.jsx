import { useState } from 'react';

import logo from "./calories_logo.png";
import "./Login.css";
import LoginForm from "./LoginForm";

//Estructura login
const Login = () => {

  const [formularioDeshabilitado, setFormularioDeshabilitado] = useState(false);

  const handleNoTienesCuentaClick = () => {
    setFormularioDeshabilitado(true);
  };

  return (
    <>
      <section className="d-flex flex-md justify-content-center login">
        <div className="card">
          <img src={logo} width="70" height="70" alt="Logo" />
          <h3>Control Calorias</h3>
          <section className="card-body">
          <LoginForm disabled={formularioDeshabilitado} />
            <br />
            <a href="#" onClick={handleNoTienesCuentaClick}>No tienes cuenta?</a>
          </section>
        </div>
      </section>
    </>
  );
};

export default Login;
