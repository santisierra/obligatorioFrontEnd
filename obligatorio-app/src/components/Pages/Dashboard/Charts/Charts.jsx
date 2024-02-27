import Bar from "./Bars/Bars";
import CalsPorFecha from "./GraficoCalPorFecha";

const Charts = () => {
  return (
    <div className="container metrics" style={{ padding: '20px'}}>
      <h2>Controles</h2>
      <div className="row">
        <div className="col-6">
          <div className="card">
            <div className="card-body">CONTADOR DE CONSUMO DE ALIEMNTO</div>
              <Bar/>
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card-body">CALORIAS POR DIA</div>
            <CalsPorFecha/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
