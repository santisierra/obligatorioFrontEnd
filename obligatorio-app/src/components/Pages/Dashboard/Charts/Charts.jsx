import Bar from "./Bars/Bars";
import CalsPorFecha from "./GraficoCalPorFecha";
import {useSelector} from "react-redux"


const Charts = () => {

  const registros = useSelector((state) => state.registrosSlice.registros);
  const alimentos = useSelector((state) => state.alimetosSlice.alimentos);
  const registrosUltimaSemana = useSelector((state) => state.registrosSlice.registrosUltimaSemana);


  // Función para contar cuántas veces un alimento ha sido consumido
  const contarConsumoAlimento = (registros, alimentoId) => {
    return registros.filter(registro => registro.idAlimento === alimentoId).length;
  };

  // Obtener el consumo de cada alimento
  const alimentosConsumidos = alimentos.map(alimento => ({
    id: alimento.id,
    nombre: alimento.nombre,
    vecesConsumido: contarConsumoAlimento(registros, alimento.id)
  })).
  //filtra los aliemntos que si consumio
  filter(alimento => alimento.vecesConsumido > 0);


// Cálculo de las calorías por fecha de la última semana
const caloriasPorFechaUltimaSemana = registrosUltimaSemana.reduce((caloriasPorFecha, registro) => {
  const alimento = alimentos.find((al) => al.id === registro.idAlimento);
  if (alimento) {
      const fecha = registro.fecha.split("T")[0];
      const caloriasRegistro = (alimento.calorias * parseFloat(registro.cantidad)) / parseFloat(alimento.porcion);
      
      // Verificar si la fecha ya existe en el array
      const existingIndex = caloriasPorFecha.findIndex(item => item.fecha === fecha);
      if (existingIndex !== -1) {
          // Si la fecha ya existe, sumar las calorías al elemento existente
          caloriasPorFecha[existingIndex].calorias += caloriasRegistro;
      } else {
          // Si la fecha no existe, agregar un nuevo objeto al array
          caloriasPorFecha.push({ fecha: fecha, calorias: caloriasRegistro });
      }
  }
  return caloriasPorFecha;
}, []);


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
            <CalsPorFecha data={caloriasPorFechaUltimaSemana}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
