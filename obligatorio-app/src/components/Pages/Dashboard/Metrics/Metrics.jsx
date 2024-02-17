import { useSelector } from "react-redux";
import "./Metrics.css";
const Metrics = () => {
  const toDos = useSelector((store) => store.todosSlice.toDos);
  const getTotalComleted = () => {
    return toDos.filter((todo) => todo.completed).length;
  };

  const getTotalInComleted = () => {
    return toDos.filter((todo) => !todo.completed).length;
  };
  return (
    <div className="container metrics">
      <div className="row">
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">TOTAL</h5>
              <p className="card-text">
                <span className="badge bg-secondary">{toDos.length}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">COMPLETED</h5>
              <p className="card-text">
                <span className="badge bg-success">{getTotalComleted()}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">INCOMPLETED</h5>
              <p className="card-text">
                <span className="badge bg-danger">{getTotalInComleted()}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
