import { useRef, useState } from "react";
import { useEffect } from "react";
import { registroUsuario } from "../../../../services/api";//importa el POST login
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onLogin } from "../../../../app/slices/userSlice";//importa slide log in (la pagina del usuario)


import Button from "../../../UI/Button/Button";
import Alert from "../../../UI/Alert/Alert";

import { getPaises } from "../../../../services/api";


const SignUpForm = () => {

  const [paises, setPaises] = useState([]);
  const [paisSeleccionado, setPaisSeleccionado] = useState('');
  
  
  const inputUserNameRef = useRef();
  const inputPassRef = useRef();
  const caloriasRef = useRef();
  const paisSeleccionadoRef = useRef();

  const dispatcher = useDispatch();
  const navigator = useNavigate();

  const [message, setMessage] = useState("");
const [messageColor, setMessageColor] = useState("danger");

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
        setMessage('Error al obtener los países:',  error.message);
        setMessageColor("danger");
      });
  }, []);

  const handlePaisChange = (event) => {
    setPaisSeleccionado(event.target.value);
  };

  const _onHandleRegister = (e) => {
    e.preventDefault()
    const inputName = inputUserNameRef.current.value;
    const inputPass = inputPassRef.current.value;
    const inputPais = paisSeleccionadoRef.current.value;
    const inputCal = caloriasRef.current.value;

    if (inputName == "" || inputPass == "" || inputPais==""||inputCal=="") {
      setMessage("Complete los campos");
      setMessageColor("danger");// TODO
    } else {
      registroUsuario(inputName, inputPass,inputPais,inputCal)
        .then((res) => {
          setMessage("Usuario registrado");
          setMessageColor("success");

          setTimeout(() => {
            dispatcher(onLogin(res));
            navigator("/dashboard");//Navega a tal lado
          }, 2000);
        })
        .catch((e) => {
          setMessage(e.message);
          setMessageColor("danger");
        });
    }
    setTimeout(() => {
      setMessage("");
    }, 3000);

  }

  return (
    <>
      <form>
      {message !== "" ? (
          <Alert classColor={messageColor} message={message} />
        ) : (
          ""
        )}


        <label>Username</label>
        <br />
        <input className="form-control" type="text" ref={inputUserNameRef} />
        <br />
        <label>Password</label>
        <br />
        <input className="form-control" type="password" ref={inputPassRef}/>
        <br />
        <label>Pais</label>
        <br />
        <select className="form-control" ref={paisSeleccionadoRef} value={paisSeleccionado} onChange={handlePaisChange}>
          <option key="0" value="">Selecciona un país</option>
          {paises.map(pais => (
            <option key={pais.id} value={pais.id}>{pais.name}</option>
          ))}
        </select>
        <br />
        <label>Calorias</label>
        <br />
        <input className="form-control" type="number" min="1" ref={caloriasRef} />
        <br />
        <Button cta={"Sign Up"} classColor={"btn-primary"}  onHandleClick={_onHandleRegister}/>
      </form>
    </>
  );
};

export default SignUpForm;
