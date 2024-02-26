import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../../Metrics/Metrics.css";


const TotalCalorias = () => {
  const alimentos = useSelector((state) => state.alimetosSlice.alimentos);
  const registrosUsuario = useSelector((state) => state.registrosSlice.registros);

  const [totalCalorias, setTotalCalorias] = useState(0);

  useEffect(() => {
    let total = 0;

    registrosUsuario.forEach(registro => {
      const alimento = alimentos.find(alimento => alimento.id === registro.idAlimento);
  
      if (alimento) {
        const caloriasRegistro = (alimento.calorias * parseFloat(registro.cantidad)) / parseFloat(alimento.porcion);
        total += caloriasRegistro;
      }
    });
  
    setTotalCalorias(total.toFixed(2));
  }, [registrosUsuario,alimentos]);



  return (
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
  );
};

export default TotalCalorias;