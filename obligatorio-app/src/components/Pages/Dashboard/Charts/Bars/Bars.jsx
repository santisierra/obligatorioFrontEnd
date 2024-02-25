import ReactApexChart from "react-apexcharts";


const Bar = ({ data }) => {
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
        categories: data.map(item => item.nombre),
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
      data: data.map(item => item.vecesConsumido)
    }];
  
    return (
      <div>
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
    );
  };
  
  export default Bar;