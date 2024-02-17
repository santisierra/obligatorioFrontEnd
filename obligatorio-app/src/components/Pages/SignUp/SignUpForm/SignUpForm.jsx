import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


import Button from "../../../UI/Button/Button";
import { getPaises } from "../../../../services/api";
const SignUpForm = () => {

  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');

  useEffect(() => {
    // Obtener los países al montar el componente
    getPaises()
      .then(data => {
        // Convertir el objeto JSON a un array usando Object.values()
      const paisesArray = Object.values(data);
      // Asignar los datos de los países al estado
      //uso el valor 1 de array por que 0 es el codigo 200 de exito
      setPaises(paisesArray[1]);
      })
      .catch(error => {
        console.error('Error al obtener los países:', error);
      });
  }, []);

  const handlePaisChange = (event) => {
    setPaisSeleccionado(event.target.value);
  };

  return (
    <>
      <form>
        <label>Username</label>
        <br />
        <input className="form-control" type="text" />
        <br />
        <label>Password</label>
        <br />
        <input className="form-control" type="password" />
        <br />
        <label>Pais</label>
        <br />
        <select className="form-control" value={paisSeleccionado} onChange={handlePaisChange}>
          <option key="0" value="">Selecciona un país</option>
          {paises.map(pais => (
            <option key={pais.id} value={pais.id}>{pais.name}</option>
          ))}
        </select>
        <br />
        <label>Calorias</label>
        <br />
        <input className="form-control" type="number" min="1" />
        <br />
        <Button cta={"Sign Up"} classColor={"btn-primary"} />
      </form>
    </>
  );
};

export default SignUpForm;
