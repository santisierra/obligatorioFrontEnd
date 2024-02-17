import { useEffect } from "react";
import Charts from "./Charts";
import "./Dashboard.css";
import Main from "./Main";
import Metrics from "./Metrics/Metrics";
import { getTodos } from "../../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { onLoadToDos } from "../../../app/slices/todosSlice";

import AlimentosForm from "./Main/AlimentosForm/AlimentosForm";

const Dashboard = () => {
  const userLogged = useSelector((store) => store.userSlice.userLogged);
  const dispatcher = useDispatch();

  useEffect(() => {
    const { id } = userLogged;
    getTodos(id)
      .then((res) => {
        dispatcher(onLoadToDos(res));
      })
      .catch((e) => {});
  }, [dispatcher, userLogged]);

  return (
    <>
         <AlimentosForm />
      <Metrics />
      <Charts />
      <h5>TO-DO LIST</h5>
      <div className="card">
        <div className="card-body">
          <Main />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
