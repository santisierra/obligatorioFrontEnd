import { useRef, useState } from "react";
import { useEffect } from "react";


import Button from "../../../../UI/Button/Button";
import {getAlimentos,postAgregarAlimento } from "../../../../../services/api";
import { onAddToDo } from "../../../../../app/slices/todosSlice";
import { useDispatch, useSelector } from "react-redux";


function AlimentosForm() {
  const inputToDoRef = useRef();
  const dispatcher = useDispatch();
  const userLogged = useSelector((store) => store.userSlice.userLogged);

  const [alimentos, SetAlimentos] = useState([]);
  const [alimentoSeleccionado, setAliemtoSeleccionado] = useState('');
 
  const [fecha, setFecha] = useState('');
  const [fechaHoy, setFechaHoy] = useState('');
  const [fechaAyer, setFechaAyer] = useState('');

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


  //Carga alimentos al select
  useEffect(() => {


  // Cálculo de la fecha de ayer
const ayer = new Date();
ayer.setDate(ayer.getDate() - 1);
const diaAyer = ayer.getDate().toString().padStart(2, '0');
const mesAyer = (ayer.getMonth() + 1).toString().padStart(2, '0');
const anoAyer = ayer.getFullYear();
const fechaAyerFormatted = `${anoAyer}-${mesAyer}-${diaAyer}`;
setFechaAyer(fechaAyerFormatted);

// Cálculo de la fecha de hoy
const hoy = new Date();
const diaHoy = hoy.getDate().toString().padStart(2, '0');
const mesHoy = (hoy.getMonth() + 1).toString().padStart(2, '0');
const anoHoy = hoy.getFullYear();
const fechaHoyFormatted = `${anoHoy}-${mesHoy}-${diaHoy}`;
setFechaHoy(fechaHoyFormatted);



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
          <input type="date" min={fechaAyer} max={fechaHoy} value={fecha} onChange={(e) => setFecha(e.target.value)} />
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