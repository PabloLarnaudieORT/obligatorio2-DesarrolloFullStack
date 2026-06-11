import { useEffect, useState } from "react";
import BotonDinamico from "../botones/BotonDinamico";
import Paginacion from "../botones/Paginacion";
import {
  obtenerEjerciciosError,
  obtenerEjerciciosStart,
  obtenerEjerciciosSuccess,
} from "../../features/userLogic/ejerciciosSlice";
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

  const [ejercicioAnalizado, setEjercicioAnalizado] = useState(null);
  const [respuestaIA, setRespuestaIA] = useState("");
  const [loadingIA, setLoadingIA] = useState(false);
  const [errorIA, setErrorIA] = useState(null);

  const { listaDeEjercicios, loading, error } = useSelector(
    (state) => state.ejerciciosStore,
  );

  const ejercicios = listaDeEjercicios ? listaDeEjercicios : [];

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

  const manejarEjercicioEditado = async () => {
    await obtenerListaDeEjercicios();
    setEjercicioSeleccionado(null);
  };

  const cerrarAnalisisIA = () => {
    setEjercicioAnalizado(null);
    setRespuestaIA("");
    setErrorIA(null);
    setLoadingIA(false);
  };

  const analizarEjercicioConIA = async (ejercicio) => {
    setEjercicioAnalizado(ejercicio);
    setRespuestaIA("");
    setErrorIA(null);
    setLoadingIA(true);

    try {
      const prompt = `
Analiza el siguiente ejercicio de gimnasio y clasifica su exigencia como "baja", "media" o "alta".

Datos:
Nombre: ${ejercicio.nombreEjercicio}
Tipo de peso: ${ejercicio.tipoDePeso}
Peso: ${ejercicio.peso}
Repeticiones: ${ejercicio.repeticiones}
Series: ${ejercicio.series}
Categoria muscular: ${ejercicio.categoriaMusculo?.nombre || "Sin categoria"}

Responde exactamente en este formato:
Exigencia: baja/media/alta
Explicacion: una explicacion breve de maximo 2 lineas.
`;

      const res = await api.post("/ai-consultas", { prompt });
      setRespuestaIA(res.data.final);
    } catch (error) {
      setErrorIA(
        error.response?.data?.message ||
          "Error al analizar el ejercicio con IA",
      );
    } finally {
      setLoadingIA(false);
    }
  };

  const obtenerExigenciaIA = (texto) => {
    const match = texto.match(/Exigencia:\s*([^\n]+)/i);
    return match?.[1]?.trim() || "Sin clasificar";
  };

  const obtenerExplicacionIA = (texto) => {
    const match = texto.match(/Explicaci[oó]n:\s*([\s\S]*)/i);
    return match?.[1]?.trim() || texto;
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
                <th>Categoria musculo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="8">Cargando ejercicios...</td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan="8" className="text-danger">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && ejercicios.length === 0 && (
                <tr>
                  <td colSpan="8">No hay ejercicios cargados</td>
                </tr>
              )}

              {!loading &&
                !error &&
                ejercicios.map((ejercicio) => (
                  <tr key={ejercicio._id}>
                    <td>{ejercicio.nombreEjercicio}</td>
                    <td>{ejercicio.tipoDePeso}</td>
                    <td>{ejercicio.peso}</td>
                    <td>{ejercicio.repeticiones}</td>
                    <td>{ejercicio.series}</td>
                    <td>{new Date(ejercicio.fecha).toLocaleDateString()}</td>
                    <td>
                      {ejercicio.categoriaMusculo?.nombre || "Sin categoria"}
                    </td>
                    <td>
                      <div className="acciones-tabla">
                        <BotonDinamico
                          onClick={() => analizarEjercicioConIA(ejercicio)}
                        >
                          Analizar IA
                        </BotonDinamico>
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
                      </div>
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

      {ejercicioAnalizado && (
        <div className="modal-backdrop modal-ia-backdrop">
          <div className="modal-contenido modal-ia-contenido">
            <button
              type="button"
              className="modal-cerrar modal-ia-cerrar"
              onClick={cerrarAnalisisIA}
            >
              x
            </button>

            <div className="tarjeta w-100 modal-ia">
              <div className="modal-ia-header">
                <span>Analisis inteligente</span>
                <h2>Analisis IA del Ejercicio</h2>
              </div>

              <p className="modal-ia-ejercicio">
                <strong>Ejercicio:</strong> {ejercicioAnalizado.nombreEjercicio}
              </p>

              <div className="ia-datos-ejercicio">
                <span>{ejercicioAnalizado.tipoDePeso}</span>
                <span>{ejercicioAnalizado.peso} kg</span>
                <span>{ejercicioAnalizado.series} series</span>
                <span>{ejercicioAnalizado.repeticiones} reps</span>
              </div>

              {loadingIA && <p className="modal-ia-loading">Analizando ejercicio...</p>}

              {errorIA && <p className="text-danger mt-1">{errorIA}</p>}

              {respuestaIA && (
                <div className="respuesta-ia">
                  <div className="respuesta-ia-estado">
                    <span>Exigencia</span>
                    <strong>{obtenerExigenciaIA(respuestaIA)}</strong>
                  </div>
                  <p>{obtenerExplicacionIA(respuestaIA)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {ejercicioSeleccionado && (
        <div className="modal-backdrop">
          <div className="modal-contenido">
            <BotonDinamico
              type="button"
              className="modal-cerrar"
              onClick={() => setEjercicioSeleccionado(null)}
            >
              x
            </BotonDinamico>

            <EditarEjercicioForm
              ejercicio={ejercicioSeleccionado}
              onEditado={manejarEjercicioEditado}
            />
          </div>
        </div>
      )}

      {ejercicioAEliminarSeleccionado && (
        <div className="modal-backdrop">
          <div className="modal-contenido">
            <BotonDinamico
              type="button"
              className="modal-cerrar"
              onClick={() => setEjercicioAEliminarSeleccionado(null)}
            >
              x
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

