import ReactApexChart from "react-apexcharts";
import {useSelector} from "react-redux"

const CalsPorFecha = () => {

    const alimentos = useSelector((state) => state.alimetosSlice.alimentos);
    const registrosUltimaSemana = useSelector((state) => state.registrosSlice.registrosUltimaSemana);


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


    const options = {
      chart: {
        type: 'line',
        height: 350,
        zoom: {
            enabled: false
          }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: caloriasPorFechaUltimaSemana.map(item => item.fecha),
      },
      yaxis: {
        labels: {
            formatter: function(val) {
                return val.toFixed(0);
              }
            },
      },
      tooltip: {
        y: {
            formatter: function (val) {
                return val.toString();
            }
        }
    }
}
  
    const series = [{
      data: caloriasPorFechaUltimaSemana.map(item => item.calorias)
    }];
  
    return (
      <div>
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
    );
  };
  
  export default CalsPorFecha;