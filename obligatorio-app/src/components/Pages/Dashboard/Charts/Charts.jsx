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


// Obtener la fecha de hoy
const today = new Date();

// Generar un array de fechas para los últimos 7 días
const lastWeekDates = [];
for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    lastWeekDates.push(date.toISOString().split('T')[0]);
}

// Mapa para almacenar las calorías por fecha de la última semana
const caloriasPorFechaUltimaSemanaMap = new Map();

// Inicializar el mapa con 0 calorías para cada fecha
lastWeekDates.forEach(date => {
    caloriasPorFechaUltimaSemanaMap.set(date, 0);
});

// Calcular las calorías por fecha de la última semana
registrosUltimaSemana.forEach(registro => {
    const alimento = alimentos.find(al => al.id === registro.idAlimento);
    if (alimento) {
        const fecha = registro.fecha.split("T")[0];
        const caloriasRegistro = (alimento.calorias * parseFloat(registro.cantidad)) / parseFloat(alimento.porcion);
        // Sumar las calorías al valor existente en el mapa
        caloriasPorFechaUltimaSemanaMap.set(fecha, caloriasPorFechaUltimaSemanaMap.get(fecha) + caloriasRegistro);
    }
});

// Convertir el mapa a un array de objetos
const caloriasPorFechaUltimaSemana = Array.from(caloriasPorFechaUltimaSemanaMap, ([fecha, calorias]) => ({ fecha, calorias }));


  return (
    <div className="container metrics" style={{ padding: '20px'}}>
      <h2>Controles</h2>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">CONTADOR DE CONSUMO DE ALIEMNTO</div>
         <Bar data={alimentosConsumidos}/>
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card-body">CALORIAS POR DIA</div>
            <CalsPorFecha data={caloriasPorFechaUltimaSemana}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
