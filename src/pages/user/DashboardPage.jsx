import DesafiosActivos from "../../components/user/DesafiosActivos";
import ProgresoGeneral from "../../components/user/InformeUso";
import CrearRutinaForm from "../../components/user/formularios/CrearRutinaForm";
import FiltroZonaMuscular from "../../components/busqueda/FiltroZonaMuscular";
import VerRutinasTabla from "../../components/tablas/VerRutinasTabla";
import InformeUso from "../../components/user/InformeUso";
import CambioPlan from "../../components/user/CambioPlan";
import GraficoRutinas from "../../components/user/GraficoRutinas";
import VerDesafiosUserTabla from "../../components/tablas/VerDesafiosUserTabla";
import { useState, useEffect } from "react";
import { obtenerMiPerfil } from "../../features/userLogic/usuarioAction";

const DashboardPage = () => {

  const [actualizarRutinas,
    setActualizarRutinas] =
    useState(false);

  const [zonaSeleccionada,
    setZonaSeleccionada] =
    useState("");

  const [plan, setPlan] = useState("");
  useEffect(() => {

    const cargarPlan = async () => {

      const resultado =
        await obtenerMiPerfil();

      if (resultado.success) {

        setPlan(
          resultado.usuario.plan
        );

      }

    };

    cargarPlan();

  }, []);

  return (
    <main className="dashboard-contenedor">
      <section className="contenido-principal">

        {/* Banner */}
        <div className="banner-home">
          <h1>Transformá tu esfuerzo en progreso</h1>
          <p>
            Registrá tus entrenamientos, seguí tu evolución y superá tus límites.
          </p>
        </div>

        {/* Crear rutina + uso del plan */}
        <div className="row mt-5 g-4">

          <div className="col-lg-7">
            <h2>Crear Rutina</h2>
            <CrearRutinaForm setActualizarRutinas={setActualizarRutinas} />
          </div>

          <div className="col-lg-5">

            <InformeUso plan={plan} actualizarRutinas={
              actualizarRutinas
            } />

            <div className="mt-3">
              <CambioPlan
                plan={plan}
                setPlan={setPlan}
              />
            </div>

          </div>

        </div>

        {/* Mis rutinas */}
        <div className="mt-5 mx-auto" style={{ maxWidth: 900 }}>

          <h2>Mis Rutinas</h2>

          <FiltroZonaMuscular valor={zonaSeleccionada}
            onChange={(e) =>
              setZonaSeleccionada(
                e.target.value
              )
            } />

          <VerRutinasTabla actualizar={actualizarRutinas}
            zonaSeleccionada={zonaSeleccionada} 
            setActualizarRutinas={setActualizarRutinas}
            />

          {/* Gráfico */}
          <div className="mt-5">
            <GraficoRutinas />
          </div>

          <div className="mt-5">
            <h2>Desafíos Disponibles</h2>

            <VerDesafiosUserTabla />
          </div>

        </div>



      </section>
    </main>
  );
};

export default DashboardPage;