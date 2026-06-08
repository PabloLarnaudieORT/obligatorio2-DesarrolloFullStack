import CrearCategoriaZonaMuscularPageForm from "../../components/admin/formularios/CrearCategoriaZonaMuscularForm";
import CrearDesafioForm from "../../components/admin/formularios/CrearDesafioForm";

import GestionarDesafioTabla from "../../components/tablas/admin/GestionarDesafioTabla";

const AdminDashboardPage = () => {
  return (
    <main className="dashboard-contenedor">
      <section className="contenido-principal">
        {/* Banner */}
        <div className="banner-home">
          <h1>Transformá tu esfuerzo en progreso</h1>
          <p>
            Registrá tus entrenamientos, seguí tu evolución y superá tus
            límites.
          </p>
        </div>

        {/* Categoria Zona Muscular */}
        <div className="mt-5 mx-auto" style={{ maxWidth: 900 }}>
          {/* Crear Categoria Zona Muscular  */}
          <h2 className="mb-4">Crear Categoría Zona Muscular</h2>
          <CrearCategoriaZonaMuscularPageForm />
        </div>

        {/* Desafios Personales Zona*/}
        <div className="mt-5 mx-auto" style={{ maxWidth: 900 }}>
          {/* Gestionar Desafios  */}
          <h2 className="mb-4">Gestionar Desafios</h2>
          <GestionarDesafioTabla />
        </div>

        {/* Crear Desafios*/}
        <div className="mt-5 mx-auto" style={{ maxWidth: 900 }}>
          <h2 className="mb-4">Crear Desafios</h2>
          <CrearDesafioForm />
        </div>
      </section>
    </main>
  );
};

export default AdminDashboardPage;
