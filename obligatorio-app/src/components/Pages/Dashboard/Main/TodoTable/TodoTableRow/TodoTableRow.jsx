import Button from "../../../../../UI/Button/Button";
import {eliminarRegistro } from "../../../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";


const TodoTableRow = ({ registros,alimentos }) => {
  const userLogged = useSelector((store) => store.userSlice.userLogged);
  const alimento = alimentos.find(alimento => alimento.id === registros.idAlimento);
  // Obtener la última letra del campo porcion del alimento
  const ultimaLetraPorcion = alimento ? alimento.porcion.slice(-1) : '';
  const dispatch = useDispatch();

  const [caloriaConsumidas, setCaloriaConsumidas] = useState(0);


  const borrarAlimento = (e) => {
    e.preventDefault();
    eliminarRegistro(registros.id, userLogged.id, userLogged.apiKey);

/*
    eliminarRegistro(registro.id, userLogged.id, userLogged.apiKey)
      .then(() => {
        // Actualizar los registros después de eliminar el registro
        // Aquí podrías hacer una nueva llamada para obtener los registros actualizados del servidor
        dispatch(onLoadRegistros([])); // Actualiza los registros en Redux
      })
      .catch((error) => {
        console.error('Error al eliminar el registro:', error);
      });*/
  };

  useEffect(() => {
    let total = 0;
    if(alimento)
    {
      const caloriasRegistro = (alimento.calorias * parseFloat(registros.cantidad)) / parseFloat(alimento.porcion);
      total += caloriasRegistro;
    }
    
    setCaloriaConsumidas(total);
  }, [registros, alimento]);


  return (
    <tr>
      <th scope="row">{registros.id}</th>
      <td>{alimento ? alimento.nombre : 'Alimento no encontrado'}</td>
      <th scope="row">{registros.cantidad+ultimaLetraPorcion}</th>
      <th scope="row">{caloriaConsumidas}</th>
      <th scope="row">{registros.fecha}</th>
      
      <td>
        <Button cta={"Delete"} onHandleClick={borrarAlimento} classColor="btn-danger" />
      </td>
    </tr>
  );
};

export default TodoTableRow;
//      <th scope="row">{caloriaConsumidas}</th>