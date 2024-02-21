import "bootstrap-css-only";
import Login from "../Pages/Login";
import Signup from "../Pages/SignUp";
import Layout from "../Pages/Layout";
import { useState } from 'react';
import {Route, Routes} from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import PrivateRoute from "../Pages/PrivateRoute";
//App principal
const App = () => {

  //cambia pagina login sigup. Se envia la funcion como prop y cambia la variable
  const [showSignup, setShowSignup] = useState(false);
  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };
  //Se guarda el usuario al loggearse
  //Si el usuario esta loggeado ir a layout sino login
  return <div className="App">
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/>
      <Route path="/Dashboard" element={<PrivateRoute>
                                            <Layout/>
                                        </PrivateRoute>}/>
    </Routes>
</div>
};

export default App;

 /* {userLogged ? <Layout /> : (
    showSignup ? <Signup toggleSignup={toggleSignup} /> : <Login toggleSignup={toggleSignup} />
  )}*/