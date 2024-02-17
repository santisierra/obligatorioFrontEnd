import "bootstrap-css-only";
import Login from "../Pages/Login";
import Layout from "../Pages/Layout";
import { useSelector } from "react-redux";
import { getPaises, getUsuariosPorPais,getRegistors,postAgregarAlimento,eliminarRegistro,getAlimentos } from "../../services/api";

//App principal
const App = () => {

  //console.log(getPaises());
  //console.log(getAlimentos(1085,"71fabc182e6d638d02cd742d4b3867f9"));
  //console.log(getUsuariosPorPais(1085,"14bb18460002bd3e5541d26ab943cd8c"));//pasar id y apikey de usuario loggeado
  //console.log(getRegistors(1085,"14bb18460002bd3e5541d26ab943cd8c"));
  //console.log(postAgregarAlimento(7,1085,6,"2023-09-21","14bb18460002bd3e5541d26ab943cd8c"));
  //console.log(eliminarRegistro(2525,1085,"71fabc182e6d638d02cd742d4b3867f9"));
  //Se guarda el usuario al loggearse
  const userLogged = useSelector((store) => store.userSlice.userLogged);
  //Si el usuario esta loggeado ir a layout sino login
  return <div className="App">{userLogged ? <Layout /> : <Login />}</div>;
};

export default App;