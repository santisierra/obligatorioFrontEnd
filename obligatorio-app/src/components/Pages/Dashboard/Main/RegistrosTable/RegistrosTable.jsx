import { useSelector } from "react-redux";
import "./RegistrosTable.css";
import RegistroTableRow from "./RegistroTableRow";


  const RegistrosTable = () => {
    //const registros = useSelector((state) => state.registrosSlice.registros);
    const alimentos = useSelector((state) => state.alimetosSlice.alimentos);

    const filteredRegistros = useSelector((store) => store.registrosSlice.filteredRegistros);

    
  return (
    <div style={{ margin: "auto", textAlign: "center" }}>
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Icono</th>
          <th scope="col">Alimento</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Calorias</th>
          <th scope="col">Fecha</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
      {filteredRegistros.map((registros) => (
      <RegistroTableRow registros={registros} 
                    alimentos={alimentos}
                    key={registros.id}/>
        ))}
      </tbody>
    </table>
    </div>

  );
};
export default RegistrosTable;