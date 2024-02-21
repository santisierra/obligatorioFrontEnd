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
    if (alimentoSeleccionado !== '' &&cantidad>0&& alimentoSeleccionado !== '0' && (fecha === hoy || fecha === ayer))    
    {
      postAgregarAlimento(alimentoSeleccionado, userLogged.id, cantidad, fecha, userLogged.apiKey).then(() => {
        dispatcher(onAddRegistro({
          "idAlimento": 8,
          "idUsuario": 7,
          "cantidad": 200,
          "fecha": "2023-09-21"
      }))//actualizar la lista registros
      }); 
    }

        /*const newTodo = {
      userId: userLogged.id,
      title: inputToDoRef.current.value,
      completed: false,
    };*/
    // ESTO ES FAKE!!! USTEDES LO TIENEN QUE HACER DE VERDAD!!
    /* saveToDo(newTodo).then(({ codigo, id }) => {
       if (codigo === 200) {
         newTodo.id = id;
         dispatcher(onAddToDo(newTodo));
       }
     });*/
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