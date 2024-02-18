import { useSelector } from "react-redux";
import "./TodoTable.css";
import TodoTableRow from "./TodoTableRow";


  const Table = () => {
    const registros = useSelector((state) => state.registrosSlice.registros);
    const alimentos = useSelector((state) => state.alimetosSlice.alimentos);

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Alimento</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Calorias</th>
          <th scope="col">Fecha</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {registros.map((registros) => (
          <TodoTableRow registros={registros} 
                        alimentos={alimentos} 
                        key={registros.id} />
        ))}
      </tbody>
    </table>
  );
};
export default Table;
