import Button from "../../../../../UI/Button/Button";
const TodoTableRow = ({ todo }) => {
  return (
    <tr>
      <th scope="row">{todo.id}</th>
      <td>{todo.title}</td>
      <td>
        <input type="checkbox" checked={todo.completed} />
      </td>
      <td>
        <Button cta={"Delete"} classColor="btn-danger" />
      </td>
    </tr>
  );
};

export default TodoTableRow;
