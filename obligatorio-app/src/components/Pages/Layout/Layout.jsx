import Header from "../Dashboard/Header";
import Dashboard from "../Dashboard";

const Layout = () => {
  return (
    <div className="container-fluid dashboard">
      <Header />
      <div className="col-10 mx-auto">
        <Dashboard />
      </div>
    </div>
  );
};

export default Layout;
