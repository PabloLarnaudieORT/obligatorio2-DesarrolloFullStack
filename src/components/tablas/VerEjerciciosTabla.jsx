import { useEffect, useState } from "react";
import BotonDinamico from "../botones/BotonDinamico";
import Paginacion from "../botones/Paginacion";
import {
  obtenerEjerciciosError,
  obtenerEjerciciosStart,
  obtenerEjerciciosSuccess,
} from "../../features/userLogic/ejercicios/ejerciciosSlice";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";
import EliminarEjercicioForm from "../user/formularios/EliminarEjercicioForm";
import EditarEjercicioForm from "../user/formularios/EditarEjercicioForm";

const VerEjerciciosTabla = () => {
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const dispatch = useDispatch();

  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);

  const [ejercicioAEliminarSeleccionado, setEjercicioAEliminarSeleccionado] =
    useState(null);

  const { listaDeEjercicios, loading, error } = useSelector(
    (state) => state.ejerciciosStore,
  );

  const obtenerListaDeEjercicios = async () => {
    dispatch(obtenerEjerciciosStart());

    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/ejercicios?page=${pagina}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalPaginas(res.data.ejercicios.totalPages);
      dispatch(obtenerEjerciciosSuccess(res.data.ejercicios.ejercicios));
    } catch (error) {
      dispatch(
        obtenerEjerciciosError(
          error.response?.data?.message || "Error al obtener los ejercicios",
        ),
      );
    }
  };

  useEffect(() => {
    obtenerListaDeEjercicios();
  }, [pagina]);

  
  const manejarEjercicioEliminado = async () => {
  await obtenerListaDeEjercicios();
  setEjercicioAEliminarSeleccionado(null);
};

  return (
    <>
      <div className="tarjeta w-100 mb-4" style={{ maxWidth: 950 }}>
        <div className="table-responsive">
          <table className="table table-dark table-hover table-sm align-middle text-center">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo peso</th>
                <th>Peso</th>
                <th>Repeticiones</th>
                <th>Series</th>
                <th>Fecha</th>
                <th>Categoría músculo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="6">Cargando ejercicios...</td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan="6" className="text-danger">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && listaDeEjercicios.length === 0 && (
                <tr>
                  <td colSpan="6">No hay desafíos cargados</td>
                </tr>
              )}

              {!loading &&
                !error &&
                listaDeEjercicios.map((ejercicio) => (
                  <tr key={ejercicio._id}>
                    <td>{ejercicio.nombreEjercicio}</td>
                    <td>{ejercicio.tipoDePeso}</td>
                    <td>{ejercicio.peso}</td>
                    <td>{ejercicio.repeticiones}</td>
                    <td>{ejercicio.series}</td>
                    <td>{new Date(ejercicio.fecha).toLocaleDateString()}</td>
                    <td>
                      {ejercicio.categoriaMusculo?.nombre || "Sin categoría"}
                    </td>
                    <td>
                      <BotonDinamico
                        onClick={() => setEjercicioSeleccionado(ejercicio)}
                      >
                        Editar
                      </BotonDinamico>
                      <BotonDinamico
                        onClick={() =>
                          setEjercicioAEliminarSeleccionado(ejercicio)
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
      {ejercicioSeleccionado && (
        //Esto es para mostrar el formulario de edición, y le paso el desafío seleccionado
        //Le agregamos un fondo oscuro para que se note que es un modal
        <div className="modal-backdrop">
          <div className="modal-contenido">
            <BotonDinamico
              type="button"
              className="modal-cerrar"
              onClick={() => setEjercicioSeleccionado(null)}
            >
              ×
            </BotonDinamico>

            <EditarEjercicioForm
              ejercicio={ejercicioSeleccionado}
              onEditado={obtenerListaDeEjercicios}
            />
          </div>
        </div>
      )}

      {ejercicioAEliminarSeleccionado && (
        //Esto es para mostrar el formulario de eliminación, y le paso el desafío seleccionado
        //Le agregamos un fondo oscuro para que se note que es un modal
        <div className="modal-backdrop">
          <div className="modal-contenido">
            <BotonDinamico
              type="button"
              className="modal-cerrar"
              onClick={() => setEjercicioAEliminarSeleccionado(null)}
            >
              ×
            </BotonDinamico>

            <EliminarEjercicioForm
              ejercicio={ejercicioAEliminarSeleccionado}
              onEliminado={manejarEjercicioEliminado}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VerEjerciciosTabla;
