import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "../../Metrics/Metrics.css";

const CaloriasDiarias = () => {
    const alimentos = useSelector((state) => state.alimetosSlice.alimentos);
    const registrosUsuario = useSelector((state) => state.registrosSlice.registros);

const [caloriasDiarias, setCaloriasDiarias] = useState(0);
  
useEffect(() => {
  let total = 0;
  const today = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'


  registrosUsuario.forEach(registro => {
    if (registro.fecha === today) {
    const alimento = alimentos.find(alimento => alimento.id === registro.idAlimento);
    if (alimento) {
      const caloriasRegistro = (alimento.calorias * parseFloat(registro.cantidad)) / parseFloat(alimento.porcion);
      total += caloriasRegistro;
    }
  }
  });
  setCaloriasDiarias(total);
}, [registrosUsuario, alimentos]);
return (
    <div className="col-sm">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">CALORIAS DE HOY</h5>
          <p className="card-text">
            <span className="badge bg-secondary">{caloriasDiarias}</span>
          </p>
        </div>
      </div>
    </div>
);
};





export default CaloriasDiarias;