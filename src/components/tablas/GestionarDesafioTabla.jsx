import EditarDesafioForm from "../admin/formularios/desafios/EditarDesafioForm";
import BotonDinamico from "../botones/BotonDinamico";
import EliminarDesafioForm from "../admin/formularios/desafios/EliminarDesafioForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerDesafiosStart,
  obtenerDesafiosSuccess,
  obtenerDesafiosError,
} from "../../features/adminLogic/desafios/desafiosSlice";
import api from "../../api/api";

const GestionarDesafioTabla = () => {
  const dispatch = useDispatch();

  //Esto le interesa solo a este componente, y es para decir
  //el comportamiento de un modal, si hace click en una row, muestro el desafioSeleccionado.
  const [desafioSeleccionado, setDesafioSeleccionado] = useState(null);

  
  const [desafioAEliminarSeleccionado, setDesafioAEliminarSeleccionado] = useState(null);

  const { desafiosObtenidos, loading, error } = useSelector(
    (state) => state.desafiosStore,
  );

  const obtenerListaDeDesafios = async () => {
    dispatch(obtenerDesafiosStart());

    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/desafios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Respuesta del backend al obtener desafíos:", res.data);
      dispatch(obtenerDesafiosSuccess(res.data.desafios));
    } catch (error) {
      dispatch(
        obtenerDesafiosError(
          error.response?.data?.message || "Error al obtener los desafíos",
        ),
      );
    }
  };

  useEffect(() => {
    obtenerListaDeDesafios();
  }, []);

  return (
    <>
      <div className="tarjeta w-100 mb-4" style={{ maxWidth: 950 }}>
        <div className="table-responsive">
          <table className="table table-dark table-hover table-sm align-middle text-center">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha Creación</th>
                <th>Fecha Límite</th>
                <th>Puntos</th>
                <th>Categoría Zona Muscular</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan="6">Cargando desafíos...</td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan="6" className="text-danger">
                    {error}
                  </td>
                </tr>
              )}

              {!loading && !error && desafiosObtenidos.length === 0 && (
                <tr>
                  <td colSpan="6">No hay desafíos cargados</td>
                </tr>
              )}

              {!loading &&
                !error &&
                desafiosObtenidos.map((desafio) => (
                  <tr key={desafio._id}>
                    <td>{desafio.nombreDesafio}</td>
                    <td>
                      {new Date(desafio.fechaCreacion).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(desafio.fechaLimite).toLocaleDateString()}
                    </td>
                    <td>{desafio.puntosDesafio}</td>
                    <td>
                      {desafio.categoriaZonaMuscular?.nombreCategoriaZona ||
                        "Sin categoría"}
                    </td>
                    <td>
                      <BotonDinamico
                        onClick={() => setDesafioSeleccionado(desafio)}
                      >
                        Editar
                      </BotonDinamico>
                      <BotonDinamico onClick={() => setDesafioAEliminarSeleccionado(desafio)}
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
      </div>

      {desafioSeleccionado && (
        //Esto es para mostrar el formulario de edición, y le paso el desafío seleccionado
        //Le agregamos un fondo oscuro para que se note que es un modal
        <div className="modal-backdrop">
          <div className="modal-contenido">
            <button
              type="button"
              className="modal-cerrar"
              onClick={() => setDesafioSeleccionado(null)}
            >
              ×
            </button>

            <EditarDesafioForm
              desafio={desafioSeleccionado}
              //despues de editar un desafio, queremos actualizar la lista de desafios en la tabla.
              onEditado={obtenerListaDeDesafios}
            />
          </div>
        </div>
      )}

      {desafioAEliminarSeleccionado && (
        //Esto es para mostrar el formulario de eliminación, y le paso el desafío seleccionado
        //Le agregamos un fondo oscuro para que se note que es un modal
        <div className="modal-backdrop">
          <div className="modal-contenido">
            <button
              type="button"
              className="modal-cerrar"
              onClick={() => setDesafioAEliminarSeleccionado(null)}
            >
              ×
            </button>

            <EliminarDesafioForm
              desafio={desafioAEliminarSeleccionado}
              //despues de eliminar un desafio, queremos actualizar la lista de desafios en la tabla.
              onEliminado={obtenerListaDeDesafios}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GestionarDesafioTabla;
