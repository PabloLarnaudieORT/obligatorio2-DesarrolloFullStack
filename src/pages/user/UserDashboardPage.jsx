//import DesafiosActivos from "../../components/user/DesafiosActivos";
//import ProgresoGeneral from "../../components/user/InformeUso";
import FiltroZonaMuscular from "../../components/busqueda/FiltroZonaMuscular";
import InformeUso from "../../components/user/InformeUso";
import CambioPlan from "../../components/user/CambioPlan";
//Rutinas
import VerRutinasTabla from "../../components/tablas/VerRutinasTabla";
import GraficoRutinas from "../../components/user/GraficoRutinas";
import CrearRutinaForm from "../../components/user/formularios/CrearRutinaForm";
//Categoria Zona Muscular
import CrearCategoriaZonaMuscularPageForm from "../../components/admin/formularios/cateogirasZonaMuscular/CrearCategoriaZonaMuscularForm";
//Categoria Muscular
import CrearCatMuscForm from "../../components/user/formularios/CrearCatMuscForm";
//Desafios
import VerDesafiosTabla from "../../components/tablas/VerDesafiosTabla";
//Ejercicios
import CrearEjercicioForm from "../../components/user/formularios/CrearEjercicioForm";
import VerEjerciciosTabla from "../../components/tablas/VerEjerciciosTabla";

import GraficoEjerciciosPorCategoria from "../../components/user/GraficoEjerciciosPorCategoria";

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

        {/* Cambio Plan*/}
        <div className="row mt-5 g-4 align-items-start">
          <div className="col-lg-5">
            <InformeUso />
          </div>

          <div className="col-lg-5">
            <CambioPlan />
          </div>
        </div>

        {/* Crear ejercicio*/}
        <div className="row mt-5 g-4">
          <div className="col-lg-7">
            <h2>Crear Ejercicio</h2>
            <CrearEjercicioForm />
          </div>
        </div>

        {/* Mis ejercicios */}
        <div className="mt-5 mx-auto" style={{ maxWidth: 900 }}>
          <h2>Mis Ejercicios</h2>

          <FiltroZonaMuscular />

          <VerEjerciciosTabla />
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
            <GraficoEjerciciosPorCategoria />
          </div>
        </div>

        {/* Crear Musculo*/}
        <div className="row mt-5 g-4">
          <div className="col-lg-7">
            <h2>Crear Musculo</h2>
            <CrearCatMuscForm />
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
