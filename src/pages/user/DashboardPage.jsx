import { useEffect, useState } from "react";
import FiltroZonaMuscular from "../../components/busqueda/FiltroZonaMuscular";
import InformeUso from "../../components/user/InformeUso";
import CambioPlan from "../../components/user/CambioPlan";
//import GraficoRutinas from "../../components/user/GraficoRutinas";
import CrearRutinaForm from "../../components/user/formularios/CrearRutinaForm";
import CrearCategoriaZonaMuscularPageForm from "../../components/admin/formularios/cateogirasZonaMuscular/CrearCategoriaZonaMuscularForm";
import CrearCatMuscForm from "../../components/user/formularios/CrearCatMuscForm";
import VerDesafiosTabla from "../../components/tablas/VerDesafiosTabla";
import VerRutinasTabla from "../../components/tablas/VerRutinasTabla"
import VerDesafiosUserTabla from "../../components/tablas/VerDesafiosUserTabla";
import CrearEjercicioForm from "../../components/user/formularios/CrearEjercicioForm";
import VerEjerciciosTabla from "../../components/tablas/VerEjerciciosTabla";
import GraficoEjerciciosPorCategoria from "../../components/user/grafica/GraficoEjerciciosPorCategoria";
import { obtenerMiPerfil } from "../../features/userLogic/usuarioAction";

const DashboardPage = () => {

  const [actualizarRutinas,
    setActualizarRutinas] =
    useState(false);

  const [actualizarEjercicios,
    setActualizarEjercicios] =
    useState(false);

  const [zonaSeleccionada,
    setZonaSeleccionada] =
    useState("");

  const [plan, setPlan] = useState("");

  useEffect(() => {
    const cargarPlan = async () => {
      const resultado = await obtenerMiPerfil();

      if (resultado.success) {
        setPlan(resultado.usuario.plan);
      }
    };

    cargarPlan();
  }, []);

  return (
    <main className="dashboard-contenedor">
      <section className="contenido-principal">
        <div className="banner-home">
          <h1>Transforma tu esfuerzo en progreso</h1>
          <p>
            Registra tus entrenamientos, segui tu evolucion y supera tus
            limites.
          </p>
        </div>



        <div className="row mt-3 g- align-items-start">
          <div className="col-lg-6">
            <InformeUso plan={plan} actualizarRutinas={actualizarRutinas} />
          </div>

          <div className="col-lg-6">
            <CambioPlan plan={plan} setPlan={setPlan} />
          </div>
        </div>


 <div className="row mt-4 g-3">

  <div className="col-lg-7">
    <h2>Crear Ejercicio</h2>
    <CrearEjercicioForm
      setActualizar={setActualizarEjercicios}
    />
  </div>

  <div className="col-lg-5">
    <h2>Categoria Muscular</h2>
    <CrearCatMuscForm />
  </div>

</div>

<div className="mt-4">
  <h2>Mis Ejercicios</h2>

  <VerEjerciciosTabla
    actualizar={actualizarEjercicios}
    setActualizarEjercicios={setActualizarEjercicios}
  />
</div>
     


   

  <div className="mt-5">
    <h2>Crear Rutina</h2>

    <CrearRutinaForm
      setActualizarRutinas={setActualizarRutinas}
      actualizarEjercicios={actualizarEjercicios}
    />
  </div>

  <div className="mt-5">

    <h2>Mis Rutinas</h2>

    <FiltroZonaMuscular
      valor={zonaSeleccionada}
      onChange={(e) =>
        setZonaSeleccionada(
          e.target.value
        )
      }
    />

    <div className="mt-3">
      <VerRutinasTabla
        actualizar={actualizarRutinas}
        zonaSeleccionada={zonaSeleccionada}
        setActualizarRutinas={setActualizarRutinas}
      />
    </div>

  </div>


   


  <div className="mt-5">
  <h2>Estadísticas</h2>

  <GraficoEjerciciosPorCategoria
    actualizar={actualizarEjercicios}
  />
</div>

  <div className="mt-5">
  <h2>Desafíos Disponibles</h2>

  <VerDesafiosUserTabla />
</div>


    </section>
    </main >
  );
};

export default DashboardPage;








