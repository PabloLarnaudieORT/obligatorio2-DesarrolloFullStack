import React from 'react'
import CrearEjercicioForm from '../../components/user/formularios/CrearEjercicioForm';
import CampoBusquedaCategoriaZonaMuscular from "../../components/busqueda/CampoBusqueda";
import VerEjerciciosTabla from "../../components/tablas/VerEjerciciosTabla";

const CrearEjercicioPage = () => {
  return (
    <>
    <h2 class="mb-4">Crear Ejercicio</h2>
    <CrearEjercicioForm />

    <div>
          <h2 className="mt-5 mb-4" >Mis Ejercicios</h2>
          <CampoBusquedaCategoriaZonaMuscular
            label="Buscar Ejercicio" />
          <VerEjerciciosTabla />
        </div>
    </>
  )
}

export default CrearEjercicioPage