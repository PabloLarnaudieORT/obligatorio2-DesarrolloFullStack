import CampoBusquedaCategoriaZonaMuscular from "../../components/busqueda/CampoBusqueda";
import GestionarDesafioTabla from "../../components/tablas/GestionarDesafioTabla";
import CrearDesafioForm from "../../components/admin/formularios/desafios/CrearDesafioForm";

const GestionarDesafiosPage = () => {
  return (
    <>
      <h2 className="mb-4">Gestion de Desafíos</h2>
      <CampoBusquedaCategoriaZonaMuscular />
      <GestionarDesafioTabla />
      <CrearDesafioForm />
    </>
  );
};

export default GestionarDesafiosPage;
