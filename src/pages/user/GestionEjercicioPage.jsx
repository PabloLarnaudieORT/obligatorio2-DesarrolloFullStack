import CrearEjercicioForm from "../../components/user/formularios/CrearEjercicioForm";
import CampoBusquedaCategoriaZonaMuscular from "../../components/busqueda/CampoBusqueda";
import VerEjerciciosTabla from "../../components/tablas/VerEjerciciosTabla";

const CrearEjercicioPage = () => {
  return (
    <>
      <h2 className="mb-4">Crear Ejercicio</h2>
      <CrearEjercicioForm />

      <div>
        <h2 className="mt-5 mb-4">Mis Ejercicios</h2>
       
        <VerEjerciciosTabla />
      </div>
    </>
  );
};

export default CrearEjercicioPage;
