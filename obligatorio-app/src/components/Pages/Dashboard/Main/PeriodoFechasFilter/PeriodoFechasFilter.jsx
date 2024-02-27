import { useRef } from "react";
import { useDispatch } from "react-redux";
import { onFilterRegistros } from "../../../../../app/slices/registrosAlimentosUsuarioSlice";

const PeriodoFechasFilter = () => {
  const selectRef = useRef();
  const dispatcher = useDispatch();

  const _onFilter = () => {
    dispatcher(onFilterRegistros(parseInt(selectRef.current.value)));
  };
  return (
    <div className="g-col-6">
      <div className="input-group">
        <select className="form-control" ref={selectRef} onChange={_onFilter}>
          <option value={0}>Todos los registos</option>
          <option value={1}>Semana Anterior</option>
          <option value={2}>Mes Anterior</option>
        </select>
      </div>
    </div>
  );
};

export default PeriodoFechasFilter;
