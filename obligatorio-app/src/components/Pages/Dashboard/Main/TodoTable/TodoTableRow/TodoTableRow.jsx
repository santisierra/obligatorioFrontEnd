import Button from "../../../../../UI/Button/Button";
const TodoTableRow = ({ registrosUsuario }) => {
  return (
    <tr>
      <th scope="row">{registrosUsuario.id}</th>
      <td>{registrosUsuario.title}</td>
      <td>
        <input type="checkbox" checked={registrosUsuario.completed} />
      </td>
      <td>
        <Button cta={"Delete"} classColor="btn-danger" />
      </td>
    </tr>
  );
};

export default TodoTableRow;
