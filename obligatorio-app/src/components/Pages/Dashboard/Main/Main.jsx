import TodoTable from "./TodoTable";
import TodoFilter from "./TodoFilter";
import TodoForm from "./TodoForm";

const Main = () => {
  return (
    <main>
      <div className="grid">
        <TodoForm />
        <br />
        <TodoFilter />
      </div>
      <br />
      <TodoTable />
    </main>
  );
};

export default Main;
