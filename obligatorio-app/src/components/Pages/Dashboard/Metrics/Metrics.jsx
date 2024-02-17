import { useSelector } from "react-redux";
import "./Metrics.css";
import { useEffect, useState } from "react";
import { getRegistors ,getAlimentos} from "../../../../services/api";


const Metrics = () => {

  const userLogged = useSelector((store) => store.userSlice.userLogged);
  const [totalCalorias, setTotalCalorias] = useState(0);

  
  const [registrosUsuario, setRegistrosUsuario] = useState([]);
  const [alimentos, SetAlimentos] = useState([]);

  const alimento = alimentos.find(alimento => alimento.id === registrosUsuario.idAlimento);

  useEffect(() => {

    getRegistors(userLogged.id, userLogged.apiKey)
        .then(data => {
          setRegistrosUsuario(data.registros);
        })
        .catch(error => {
          console.error('Error al obtener los registros:', error);
        });

        getAlimentos(userLogged.id, userLogged.apiKey)
        .then(data => {
          const alimentosArray = Object.values(data);
          SetAlimentos(alimentosArray[1]);
        })
        .catch(error => {
          console.error('Error al obtener los países:', error);
        });
            
  }, []); // El array vacío asegura que useEffect se ejecute solo una vez al montar el componente


  useEffect(() => {
    let total = 0;

    registrosUsuario.forEach(registro => {
      const alimento = alimentos.find(alimento => alimento.id === registro.idAlimento);
  
      if (alimento) {
        const caloriasRegistro = (alimento.calorias * parseFloat(registro.cantidad)) / parseFloat(alimento.porcion);
        total += caloriasRegistro;
      }
    });
  
    setTotalCalorias(total);
  }, [registrosUsuario, alimentos]);



  return (
    <div className="container metrics">
      <div className="row">
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">TOTAL</h5>
              <p className="card-text">
                <span className="badge bg-secondary">{totalCalorias}</span>
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
  );
};

export default Metrics;

/*        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">COMPLETED</h5>
              <p className="card-text">
                <span className="badge bg-success">{getTotalComleted()}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">INCOMPLETED</h5>
              <p className="card-text">
                <span className="badge bg-danger">{getTotalInComleted()}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> */