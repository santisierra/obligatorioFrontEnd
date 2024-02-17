import TodoTable from "./TodoTable";
import TodoFilter from "./TodoFilter";
import AlimentosForm from "./AlimentosForm";

const Main = () => {
  return (
    <main>
      <div className="grid">
        <AlimentosForm />
        <br />
        <TodoFilter />
      </div>
      <br />
      <TodoTable />
    </main>
  );
};

export default Main;
