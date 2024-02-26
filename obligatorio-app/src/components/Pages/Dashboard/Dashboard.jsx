import { useEffect } from "react";
import Charts from "./Charts";
import "./Dashboard.css";
import Main from "./Main";
import Metrics from "./Metrics/Metrics";
import { getAlimentos, getRegistors, getTodos } from "../../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { onLoadRegistros } from "../../../app/slices/registrosAlimentosUsuarioSlice";
import ContadorNuevoPlan from "../Dashboard/ContadorNuevoPlan";
import { onLoadAlimentos } from "../../../app/slices/alimentosSlice";
import AlimentosForm from "./Main/AlimentosForm/AlimentosForm";
import Map from "./Map";

const Dashboard = () => {
  const userLogged = useSelector((store) => store.userSlice.userLogged);


  const dispatcher = useDispatch();

  //Carga los registros del usuario y los salva en el slice
  useEffect(() => {
    getRegistors(userLogged.id,userLogged.apiKey)
      .then((res) => {
        dispatcher(onLoadRegistros(res.registros));
      })
      .catch((e) => {});
  }, [dispatcher, userLogged]);
//Carga los alimentos al iniciar sesion
  useEffect(() => {
    getAlimentos(userLogged.id, userLogged.apiKey)
      .then((data) => {
        const alimentosArray = Object.values(data);
        dispatcher(onLoadAlimentos(alimentosArray[1]));
      })
      .catch((error) => {
        console.error('Error al obtener alimentos:', error);
      });
  }, [dispatcher, userLogged]);


  return (
    <>
      <ContadorNuevoPlan />
      <AlimentosForm/>
      <Metrics />
      <Charts />
      <Map/>
      <div style={{padding: '20px' }}>

        <h5>Registros</h5>
        <div className="card" >
          <div className="card-body">
            <Main />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Dashboard;
//