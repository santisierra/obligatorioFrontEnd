import { useSelector } from "react-redux";
import "./TodoTable.css";
import TodoTableRow from "./TodoTableRow";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getRegistors } from "../../../../../services/api";

  const Table = () => {

    const userLogged = useSelector((store) => store.userSlice.userLogged);


    const [registrosUsuario, setRegistrosUsuario] = useState([]);

    useEffect(() => {
      getRegistors(userLogged.id, userLogged.apiKey)
        .then(data => {
          setRegistrosUsuario(data.registros);
        })
        .catch(error => {
          console.error('Error al obtener los registros:', error);
        });
    }, []);



  //const filteredToDos = useSelector((store) => store.todosSlice.filteredToDos);
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Completed</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {registrosUsuario.map((registrosUsuario) => (
          <TodoTableRow registrosUsuario={registrosUsuario} key={registrosUsuario.id} />
        ))}
      </tbody>
    </table>
  );
};
export default Table;
