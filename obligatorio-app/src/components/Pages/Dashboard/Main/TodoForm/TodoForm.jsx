import { useRef } from "react";
import Button from "../../../../UI/Button/Button";
import { saveToDo } from "../../../../../services/api";
import { onAddToDo } from "../../../../../app/slices/todosSlice";
import { useDispatch, useSelector } from "react-redux";

const TodoForm = () => {
  const inputToDoRef = useRef();
  const dispatcher = useDispatch();
  const userLogged = useSelector((store) => store.userSlice.userLogged);

  const _onAddToDo = (e) => {
    e.preventDefault();

    const newTodo = {
      userId: userLogged.id,
      title: inputToDoRef.current.value,
      completed: false,
    };
    // ESTO ES FAKE!!! USTEDES LO TIENEN QUE HACER DE VERDAD!!
    saveToDo(newTodo).then(({ codigo, id }) => {
      if (codigo === 200) {
        newTodo.id = id;
        dispatcher(onAddToDo(newTodo));
      }
    });
  };
  return (
    <div className="g-col-6">
      <form className="row">
        <div className="col">
          <input
            ref={inputToDoRef}
            type={"text"}
            className="form-control"
            id="todoInput"
            placeholder="Add todo.."
          />
        </div>
        <div className="col-auto">
          <Button cta={"+ Add"} onHandleClick={_onAddToDo}></Button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
