import ReactApexChart from "react-apexcharts";


const CalsPorFecha = ({ data }) => {
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
        categories: data.map(item => item.fecha),
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
      data: data.map(item => item.calorias)
      
    }];
  
    return (
      <div>
        <ReactApexChart options={options} series={series} type="line" height={350} />
      </div>
    );
  };
  
  export default CalsPorFecha;