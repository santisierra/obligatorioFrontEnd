import Button from "../../../../../UI/Button/Button";
import {eliminarRegistro } from "../../../../../../services/api";
import { useDispatch, useSelector } from "react-redux";


const TodoTableRow = ({ registrosUsuario,alimentos }) => {
  const userLogged = useSelector((store) => store.userSlice.userLogged);

  const alimento = alimentos.find(alimento => alimento.id === registrosUsuario.idAlimento);
  // Obtener la última letra del campo porcion del alimento
  const ultimaLetraPorcion = alimento ? alimento.porcion.slice(-1) : '';

  const borrarAlimento = (e) => {
    e.preventDefault();
    eliminarRegistro(registrosUsuario.id, userLogged.id, userLogged.apiKey);
  };


  return (
    <tr>
      <th scope="row">{registrosUsuario.id}</th>
      <td>{alimento ? alimento.nombre : 'Alimento no encontrado'}</td>
      <th scope="row">{registrosUsuario.cantidad+ultimaLetraPorcion}</th>
      <th scope="row">{registrosUsuario.fecha}</th>
      
      <td>
        <Button cta={"Delete"} onHandleClick={borrarAlimento} classColor="btn-danger" />
      </td>
    </tr>
  );
};

export default TodoTableRow;
