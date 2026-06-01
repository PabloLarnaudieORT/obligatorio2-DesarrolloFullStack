import { useState } from "react";
import { Outlet } from "react-router";
import AdminMenuHamburguesa from "../components/admin/AdminMenuHamburguesa";
import HeaderPage from "./HeaderPage";

const AdminContainerPage = () => {
  const [menuAbierto, setMenuAbierto] = useState(true);

  const alternarMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <>
      <HeaderPage onMenuClick={alternarMenu} />
      <main className="dashboard-contenedor">
        <AdminMenuHamburguesa menuAbierto={menuAbierto} />
        <section className="contenido-principal">
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default AdminContainerPage;
