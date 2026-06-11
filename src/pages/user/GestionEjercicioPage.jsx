import CrearEjercicioForm from "../../components/user/formularios/CrearEjercicioForm";
import CampoBusquedaCategoriaZonaMuscular from "../../components/busqueda/CampoBusqueda";
import VerEjerciciosTabla from "../../components/tablas/VerEjerciciosTabla";
import { useState } from "react";
const CrearEjercicioPage = () => {

  const [actualizar, setActualizar] =
  useState(false);

  return (
    <>
      <h2 className="mb-4">Crear Ejercicio</h2>
      <CrearEjercicioForm setActualizar={setActualizar} />

      <div>
        <h2 className="mt-5 mb-4">Mis Ejercicios</h2>
       
        <VerEjerciciosTabla actualizar={actualizar} />
      </div>
    </>
  );
};

export default CrearEjercicioPage;
