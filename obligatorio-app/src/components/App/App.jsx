import "bootstrap-css-only";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp";
import Layout from "../Pages/Layout";
import { useSelector } from "react-redux";
import { useState } from 'react';

//App principal
const App = () => {

  //cambia pagina login sigup. Se envia la funcion como prop y cambia la variable
  const [showSignup, setShowSignup] = useState(false);
  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };
  //Se guarda el usuario al loggearse
  const userLogged = useSelector((store) => store.userSlice.userLogged);
  //Si el usuario esta loggeado ir a layout sino login
  return <div className="App">
  {userLogged ? <Layout /> : (
    showSignup ? <Signup toggleSignup={toggleSignup} /> : <Login toggleSignup={toggleSignup} />
  )}

</div>
};

export default App;