import RegistrosTable from "./RegistrosTable";
import PeriodoFechasFilter from "./PeriodoFechasFilter";

const Main = () => {
  return (
    <main>
      <div className="grid">

        <PeriodoFechasFilter />
      </div>
      <br />
      <RegistrosTable />
    </main>
  );
};

export default Main;
//        <AlimentosForm />
//<br />