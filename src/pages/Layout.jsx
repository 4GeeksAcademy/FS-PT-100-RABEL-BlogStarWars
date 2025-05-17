import { Outlet } from "react-router-dom";
import { BarraNavegacion } from '../components/Navbar';
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <BarraNavegacion />
      <main className="container mt-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;