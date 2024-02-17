import { useSelector } from "react-redux";
import "./TodoTable.css";
import TodoTableRow from "./TodoTableRow";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { getRegistors ,getAlimentos} from "../../../../../services/api";

  const Table = () => {

    const userLogged = useSelector((store) => store.userSlice.userLogged);


    const [registrosUsuario, setRegistrosUsuario] = useState([]);
    const [alimentos, SetAlimentos] = useState([]);


    useEffect(() => {
      getRegistors(userLogged.id, userLogged.apiKey)
        .then(data => {
          setRegistrosUsuario(data.registros);
        })
        .catch(error => {
          console.error('Error al obtener los registros:', error);
        });

        getAlimentos(userLogged.id, userLogged.apiKey)
        .then(data => {
          const alimentosArray = Object.values(data);
          SetAlimentos(alimentosArray[1]);
        })
        .catch(error => {
          console.error('Error al obtener los países:', error);
        });
        

    }, []);



  //const filteredToDos = useSelector((store) => store.todosSlice.filteredToDos);
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Alimento</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Fecha</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {registrosUsuario.map((registrosUsuario) => (
          <TodoTableRow registrosUsuario={registrosUsuario} 
                        alimentos={alimentos} 
                        key={registrosUsuario.id} />
        ))}
      </tbody>
    </table>
  );
};
export default Table;
