import CampoBusquedaCategoriaZonaMuscular from "../../components/busqueda/CampoBusqueda";
import GestionarProductosTabla from "../../components/tablas/GestionarProductosTabla";
import CrearProductoForm from "../../components/admin/formularios/CrearProductoForm";

const GestionarProductosPage = () => {
  return (
    <div>
      <h1>Gestion de Productos</h1>
      <CampoBusquedaCategoriaZonaMuscular />
      <GestionarProductosTabla />
      <CrearProductoForm />
    </div>
  );
};

export default GestionarProductosPage;
