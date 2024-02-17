import { useSelector } from "react-redux";
import "./TodoTable.css";
import TodoTableRow from "./TodoTableRow";

const Table = () => {
  const filteredToDos = useSelector((store) => store.todosSlice.filteredToDos);
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Completed</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        {filteredToDos.map((toDo) => (
          <TodoTableRow todo={toDo} key={toDo.id} />
        ))}
      </tbody>
    </table>
  );
};
export default Table;
