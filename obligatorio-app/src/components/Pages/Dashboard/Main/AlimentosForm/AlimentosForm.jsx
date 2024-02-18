import { useRef, useState } from "react";
import { useEffect } from "react";


import Button from "../../../../UI/Button/Button";
import {getAlimentos,postAgregarAlimento } from "../../../../../services/api";
import { onAddToDo } from "../../../../../app/slices/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import {getFechaDesdeHoy} from "../../../../../utils/DatosGenerales"


function AlimentosForm() {
  const inputToDoRef = useRef();
  const dispatcher = useDispatch();
  const userLogged = useSelector((store) => store.userSlice.userLogged);

  const [alimentos, SetAlimentos] = useState([]);
  const [alimentoSeleccionado, setAliemtoSeleccionado] = useState('');
 
  const [hoy, setHoy] = useState('');
  const [ayer, setAyer] = useState('');
  const [fecha, setFecha] = useState('');

  const [cantidad, setCantidad] = useState('');


  const agregarAlimento = (e) => {
    e.preventDefault();
    console.log(alimentoSeleccionado);
    postAgregarAlimento(alimentoSeleccionado, userLogged.id, cantidad, fecha, userLogged.apiKey);
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
    setAyer(getFechaDesdeHoy(1));
  }, []);

  //Carga alimentos al select
  useEffect(() => {

    // Obtener los alimentos al montar el componente
    getAlimentos(userLogged.id, userLogged.apiKey)
      .then(data => {
        // Convertir el objeto JSON a un array usando Object.values()
        const alimentosArray = Object.values(data);
        // Asignar los datos de los alimentos al estado
        //uso el valor 1 de array por que 0 es el codigo 200 de exito
        SetAlimentos(alimentosArray[1]);
      })
      .catch(error => {
        console.error('Error al obtener los países:', error);
      });
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

//<input ref={inputToDoRef} type={"text"} className="form-control" id="todoInput"placeholder="Add todo.." />
/*   "alimentos": [
        {
            "id": 1,
            "nombre": "Manzana",
            "calorias": 52,
            "proteinas": 0.25,
            "grasas": 0.1700000000000000122124532708767219446599483489990234375,
            "carbohidratos": 14,
            "porcion": "100g",
            "imagen": 7
        }, */