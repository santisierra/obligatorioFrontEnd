import Bar from "./Bars/Bars";
import {useSelector} from "react-redux"
const Charts = () => {

  const registros = useSelector((state) => state.registrosSlice.registros);
  const alimentos = useSelector((state) => state.alimetosSlice.alimentos);

  // Función para contar cuántas veces un alimento ha sido consumido
  const contarConsumoAlimento = (registros, alimentoId) => {
    return registros.filter(registro => registro.idAlimento === alimentoId).length;
  };

  // Obtener el consumo de cada alimento
  const alimentosConsumidos = alimentos.map(alimento => ({
    id: alimento.id,
    nombre: alimento.nombre,
    vecesConsumido: contarConsumoAlimento(registros, alimento.id)
  })).filter(alimento => alimento.vecesConsumido > 0);
 // const datosFiltrados = alimentosConsumidos.filter(alimento => alimento.vecesConsumido > 0);

  

  return (
    <div className="container metrics">
      <h5>METRICS</h5>
      <div className="row">
        <div className="col-8">
          <div className="card">
            <div className="card-body">CONTADOR DE CONSUMO DE ALIEMNTO</div>
         <Bar data={alimentosConsumidos}/>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">A PIE CHART WILL BE DISPLAYED HERE</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
