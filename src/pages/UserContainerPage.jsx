
import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import Navbar from "../components/user/Navbar";
import Sidebar from "../components/user/Sidebar";

const UserContainerPage = () => {
    const [menuAbierto, setMenuAbierto] = useState(true);
    
      const alternarMenu = () => {
        setMenuAbierto(!menuAbierto);
      };
  return (
  <>
      {/* El Navbar va solo, arriba de todo */}
      <Navbar alternarMenu={alternarMenu} />
      
      {/* El contenedor principal envuelve el Sidebar y el Contenido */}
      <main className="dashboard-contenedor">
        <Sidebar abierto={menuAbierto} /> 
        <section className="contenido-principal">
          <Outlet /> 
        </section>
      </main>
    </>
  )
}

export default UserContainerPage