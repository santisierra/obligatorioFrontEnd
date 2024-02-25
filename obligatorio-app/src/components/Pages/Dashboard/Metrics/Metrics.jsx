import { useSelector } from "react-redux";
import "./Metrics.css";
import { useEffect, useState } from "react";
import { getRegistors ,getAlimentos} from "../../../../services/api";
import TotalCalorias from "./TotalCalorias";
import CaloriasDiarias from "./CaloriasDiarias";
const Metrics = () => {

  return (
    <div className="container metrics">
      <div className="row">
                <TotalCalorias/>
                <CaloriasDiarias/>
        </div>
      </div>
  );
};
export default Metrics;