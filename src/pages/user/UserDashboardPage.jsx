import DesafiosActivos from "../../components/user/DesafiosActivos";
import ProgresoGeneral from "../../components/user/InformeUso";
import CrearRutinaForm from "../../components/user/formularios/CrearRutinaForm";
import FiltroZonaMuscular from "../../components/busqueda/FiltroZonaMuscular";
import VerRutinasTabla from "../../components/tablas/VerRutinasTabla";
import InformeUso from "../../components/user/InformeUso";
import CambioPlan from "../../components/user/CambioPlan";
import GraficoRutinas from "../../components/user/GraficoRutinas";
import CrearCategoriaZonaMuscularPageForm from "../../components/admin/formularios/cateogirasZonaMuscular/CrearCategoriaZonaMuscularForm";

import VerDesafiosTabla from "../../components/tablas/VerDesafiosTabla";

const UserDashboardPage = () => {
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

        {/* Crear rutina + uso del plan */}
        <div className="row mt-5 g-4">
          <div className="col-lg-7">
            <h2>Crear Rutina</h2>
            <CrearRutinaForm />
          </div>

          <div className="col-lg-5">
            <InformeUso />

            <div className="mt-3">
              <CambioPlan />
            </div>
          </div>
        </div>

        {/* Mis rutinas */}
        <div className="mt-5 mx-auto" style={{ maxWidth: 900 }}>
          <h2>Mis Rutinas</h2>

          <FiltroZonaMuscular />

          <VerRutinasTabla />

          {/* Gráfico */}
          <div className="mt-5">
            <GraficoRutinas />
          </div>
        </div>

        {/* Categoria Zona Muscular */}
        <div className="mt-5 mx-auto" style={{ maxWidth: 900 }}>
          {/* Crear Categoria Zona Muscular  */}
          <h2 className="mb-4">Crear Categoría Zona Muscular</h2>
          <CrearCategoriaZonaMuscularPageForm />
        </div>

        {/* Ver Desafios Personales*/}
        <div className="mt-5 mx-auto" style={{ maxWidth: 900 }}>
          {/* Gestionar Desafios  */}
          <h2 className="mb-4">Ver Desafios Personales</h2>
          <VerDesafiosTabla />
        </div>
      </section>
    </main>
  );
};

export default UserDashboardPage;
