import CampoBusquedaCategoriaZonaMuscular from "../../components/busqueda/CampoBusqueda";
import GestionarUsuariosTabla from "../../components/tablas/GestionarProductosTabla";

const GestionUsuariosPage = () => {
  return (
    <div>
      <h1>Gestion de Usuarios</h1>
      <CampoBusquedaCategoriaZonaMuscular />
      <GestionarUsuariosTabla />
    </div>
  );
};

export default GestionUsuariosPage;
