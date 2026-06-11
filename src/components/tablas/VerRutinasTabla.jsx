import BotonDinamico from "../botones/BotonDinamico";
import Paginacion from "../botones/Paginacion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import api from "../../api/api";
import EditarRutinaForm from "../user/formularios/EditarRutinaForm";
import EliminarRutinaForm from "../user/formularios/EliminarRutinaForm";
import {
  obtenerRutinasStart,
  obtenerRutinasSuccess,
  obtenerRutinasError,
} from "../../features/userLogic/rutinas/rutinasSlice";

const VerRutinasTabla = ({ actualizar, zonaSeleccionada, setActualizarRutinas }) => {

  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);

  const [rutinaSeleccionada, setRutinaSeleccionada] =
    useState(null);

  const [
    rutinaAEliminarSeleccionada,
    setRutinaAEliminarSeleccionada
  ] = useState(null);

  const dispatch = useDispatch();

  const {
    listaDeRutinas,
    loading,
    error
  } = useSelector(
    (state) => state.rutinasStore
  );


  const obtenerListaDeRutinas =
    async () => {

      

      dispatch(
        obtenerRutinasStart()
      );

      try {

        const token =
          localStorage.getItem("token");


        let url =
          `/rutinas?page=${pagina}`;

        if (zonaSeleccionada) {
          url =
            `/rutinas?zona=${zonaSeleccionada}`;
        }

        const res =
          await api.get(url,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

          console.log(
  "RESPUESTA FILTRO:",
  res.data
);
      
       if (Array.isArray(res.data.rutinas)) {

  setTotalPaginas(1);

  dispatch(
    obtenerRutinasSuccess(
      res.data.rutinas
    )
  );

} else {

  setTotalPaginas(
    res.data.rutinas.totalPages
  );

  dispatch(
    obtenerRutinasSuccess(
      res.data.rutinas.rutinas
    )
  );

}

      } catch (error) {

        console.log("ERROR COMPLETO:");
console.log(error);

console.log("ERROR RESPONSE:");
console.log(error.response);

console.log("ERROR DATA:");
console.log(error.response?.data);

        dispatch(
          obtenerRutinasError(
            error.response?.data?.message ||
            "Error al obtener rutinas"
          )
        );
      }

    };

  useEffect(() => {
    obtenerListaDeRutinas();
  }, [pagina, actualizar, zonaSeleccionada]);

  const manejarRutinaEliminada = async () => {
    await obtenerListaDeRutinas();
    setRutinaAEliminarSeleccionada(null);

     setActualizarRutinas(prev => !prev);
  };

  const manejarRutinaEditada = async () => {
    await obtenerListaDeRutinas();
    setRutinaSeleccionada(null);
  };

  

  return (
    <>
      <div className="tarjeta w-100 mb-4" style={{ maxWidth: 950 }}>
        <div className="table-responsive">
          <table className="table table-dark table-hover table-sm align-middle text-center">
            <thead>
              <tr>
                <th>Zona Muscular</th>
                <th>Ejercicios</th>
                <th>Fecha Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="4">Cargando rutinas...</td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan="4" className="text-danger">
                    {error}
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                listaDeRutinas.length === 0 && (
                  <tr>
                    <td colSpan="4">
                      No hay rutinas cargadas
                    </td>
                  </tr>
                )}

              {!loading &&
                !error &&
                listaDeRutinas.map((rutina) => (
                  <tr key={rutina._id}>
                    <td>
                      {rutina.categoriaZonaMuscular?.nombreCategoriaZona}
                    </td>

                    <td>
                      {rutina.ejercicios.map((ejercicio) => (
                        <div key={ejercicio._id}>
                          {ejercicio.idEjercicio?.nombreEjercicio}
                        </div>
                      ))}
                    </td>

                    <td>
                      {new Date(
                        rutina.fechaCreacion
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <BotonDinamico
                        onClick={() =>
                          setRutinaSeleccionada(rutina)
                        }
                      >
                        Editar
                      </BotonDinamico>

                      <BotonDinamico
                        onClick={() =>
                          setRutinaAEliminarSeleccionada(rutina)
                        }
                        classText="text-danger"
                      >
                        Eliminar
                      </BotonDinamico>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <Paginacion
          paginaActual={pagina}
          totalPaginas={totalPaginas}
          onCambiarPagina={setPagina}
        />
      </div>

      {rutinaSeleccionada && (
        <div className="modal-backdrop">
          <div className="modal-contenido">
            <BotonDinamico
              type="button"
              className="modal-cerrar"
              onClick={() =>
                setRutinaSeleccionada(null)
              }
            >
              ×
            </BotonDinamico>

            <EditarRutinaForm
              rutina={rutinaSeleccionada}
              onEditado={manejarRutinaEditada}
            />
          </div>
        </div>
      )}

      {rutinaAEliminarSeleccionada && (
        <div className="modal-backdrop">
          <div className="modal-contenido">
            <BotonDinamico
              type="button"
              className="modal-cerrar"
              onClick={() =>
                setRutinaAEliminarSeleccionada(null)
              }
            >
              ×
            </BotonDinamico>

            <EliminarRutinaForm
              rutina={rutinaAEliminarSeleccionada}
              onEliminado={manejarRutinaEliminada}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VerRutinasTabla;