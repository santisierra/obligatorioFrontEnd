import { useRef, useState } from "react";
import { useEffect } from "react";

import Alert from "../../../../UI/Alert/Alert";

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
  const [ultimaLetraPorcion, SetUnidadSeleccionbado] = useState('');

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("danger");



  const agregarAlimento = (e) => {
    e.preventDefault();
    const idAlimentoSeleccionado = parseInt(alimentoSeleccionado);
    if (alimentoSeleccionado !== '' &&cantidad>0&& idAlimentoSeleccionado !== 0 && (fecha === hoy || fecha === ayer))    
    {
      const cant = parseFloat(cantidad);
      //si el alimento es en unidades se transforma a un valor entero
      const cantidadTransformada = ultimaLetraPorcion === 'u' ? Math.floor(cant) : cant.toFixed(2);

      postAgregarAlimento(idAlimentoSeleccionado, userLogged.id, cantidadTransformada, fecha, userLogged.apiKey).then((response) => {

        dispatcher(onAddRegistro({
          "id": response.idRegistro,
          "idAlimento": idAlimentoSeleccionado,
          "idUsuario": userLogged.id,
          "cantidad": cantidadTransformada,
          "fecha": fecha
      }))
      
      setMessage("Registro exitoso");
      setMessageColor("success");

      }); 
    }
    else{
      setMessage("No pudo ingresarse la solicitud");
      setMessageColor("danger");
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);

  };

  useEffect(() => {
    setHoy(getFechaDesdeHoy(0));
    setAyer(getFechaDesdeHoy(-1));
  }, []);


  const handleAlimentoChange = (event) => {
    setAliemtoSeleccionado(event.target.value);
    const alimento = alimentos.find(alimento => alimento.id === parseInt(event.target.value));
    SetUnidadSeleccionbado ( alimento ? alimento.porcion.slice(-1) : '');
  };

  const handleCantidadChange = (event) => {
    setCantidad(event.target.value);
  };



  return (

    <div className="col-auto align-items-center" style={{ padding: '20px' }}>
      <h2 className="text-start mb-5">Ingresar Alimento</h2>
      <form className="row align-items-center ">
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
          <label>Cantidad</label>
          <input className="form-control" type="number" value={cantidad} onChange={handleCantidadChange} />
        </div>
        <div className="col">
          <label className="col-12">Fecha</label>
          <input className="form-control" type="date" min={ayer} max={hoy} value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="col-auto mt-auto">
          <Button cta={"Agregar"} onHandleClick={agregarAlimento}></Button>
        </div>
      </form>
      <div className="col-12 p-0 mt-3">
      {message !== "" ? (
          <Alert classColor={messageColor} message={message} />
        ) : (
          ""
        )}
        </div>
    </div>
  );
}

export default AlimentosForm;