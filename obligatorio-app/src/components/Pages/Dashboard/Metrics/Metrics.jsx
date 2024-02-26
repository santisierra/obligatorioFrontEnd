import { useSelector } from "react-redux";
import "./Metrics.css";
import { useEffect, useState } from "react";
import { getRegistors ,getAlimentos} from "../../../../services/api";
import TotalCalorias from "./TotalCalorias";
import CaloriasDiarias from "./CaloriasDiarias";
const Metrics = () => {

  return (
    <div className="container metrics" style={{backgroundColor: '#f0f0f0', padding: '20px'}}>
      <h2 className="text-start">Metricas</h2>
      <div className="row">
                <TotalCalorias/>
                <CaloriasDiarias/>
        </div>
      </div>
  );
};
export default Metrics;