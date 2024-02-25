import { useRef, useState } from "react";
import { useEffect } from "react";


import Button from "../../../../UI/Button/Button";
import {postAgregarAlimento } from "../../../../../services/api";
import { onAddRegistro } from "../../../../../app/slices/registrosAlimentosUsuarioSlice";
import { useDispatch, useSelector } from "react-redux";
import {getFechaDesdeHoy} from "../../../../../utils/DatosGenerales"


function AlimentosForm() {

  const alimentos = useSelector((state) => state.alimetosSlice.alimentos);
  const userLogged = useSelector((store) => store.userSlice.userLogged);
  const dispatcher = useDispatch()

  //const [alimentos, SetAlimentos] = useState([]);
  const [alimentoSeleccionado, setAliemtoSeleccionado] = useState('');
 
  const [hoy, setHoy] = useState('');
  const [ayer, setAyer] = useState('');
  const [fecha, setFecha] = useState('');

  const [cantidad, setCantidad] = useState('');




  const agregarAlimento = (e) => {
    e.preventDefault();
    const idAlimentoSeleccionado = parseInt(alimentoSeleccionado);

    if (alimentoSeleccionado !== '' &&cantidad>0&& idAlimentoSeleccionado !== 0 && (fecha === hoy || fecha === ayer))    
    {
      postAgregarAlimento(idAlimentoSeleccionado, userLogged.id, cantidad, fecha, userLogged.apiKey).then((response) => {
        console.log(response.idRegistro);
        dispatcher(onAddRegistro({
          "id": response.idRegistro,
          "idAlimento": idAlimentoSeleccionado,
          "idUsuario": userLogged.id,
          "cantidad": cantidad,
          "fecha": fecha
      }))//actualizar la lista registros
      }); 
    }

  };

  useEffect(() => {
    setHoy(getFechaDesdeHoy(0));
    setAyer(getFechaDesdeHoy(-1));
  }, []);


  const handleAlimentoChange = (event) => {
    setAliemtoSeleccionado(event.target.value);
  };

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
  };



  return (
    <div className="g-col-6">
      <form className="row">
        <div className="col">
          <label>Alimento</label>
          <select className="form-control" value={alimentoSeleccionado} onChange={handleAlimentoChange}>
            <option key="0" value="">Selecciona un aliemto</option>
            {alimentos.map(alimentos => (
              <option key={alimentos.id} value={alimentos.id}>{alimentos.nombre}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <label className="row">Cantidad</label>
          <input type="number" value={cantidad} onChange={handleCantidadChange} />
        </div>
        <div className="col">
          <label className="row">Fecha</label>
          <input type="date" min={ayer} max={hoy} value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="col-auto">
          <Button cta={"Agregar"} onHandleClick={agregarAlimento}></Button>
        </div>
      </form>
    </div>
  );
}

export default AlimentosForm;