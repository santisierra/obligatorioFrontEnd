import ReactApexChart from "react-apexcharts";
import {useSelector} from "react-redux"


const Bar = () => {



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
    })).
    //filtra los aliemntos que si consumio
    filter(alimento => alimento.vecesConsumido > 0);



    const options = {
      chart: {
        type: 'bar',
        height: 350
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
      xaxis: {
        categories: alimentosConsumidos.map(item => item.nombre),
        labels: {
            formatter: function(val) {
                return val.toFixed(0);
              }
            },
        stepSize: 1


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
      data: alimentosConsumidos.map(item => item.vecesConsumido)
    }];
  
    return (
      <div>
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
    );
  };
  
  export default Bar;