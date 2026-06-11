import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import BotonDinamico from "../../botones/BotonDinamico";

import {
  eliminarRutinasStart,
  eliminarRutinasSuccess,
  eliminarRutinasError,
} from "../../../features/userLogic/rutinas/rutinasSlice";

import api from "../../../api/api";

const EliminarRutinaForm = ({
  rutina,
  onEliminado,
}) => {

  const dispatch = useDispatch();

  const {
    loading,
    error,
    successMessage,
  } = useSelector(
    (state) => state.rutinasStore
  );

   const { handleSubmit } = useForm({
    mode: "onChange",
  });

  const eliminarRutina =
    async () => {

      dispatch(
        eliminarRutinasStart()
      );

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await api.delete(
            `/rutinas/${rutina._id}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        dispatch(
          eliminarRutinasSuccess(
            res.data
          )
        );

        onEliminado();

      } catch (error) {

        dispatch(
          eliminarRutinasError(
            error.response?.data?.message ||
            "Error al eliminar rutina"
          )
        );

      }

    };

  return (
  <>
    <div
      className="tarjeta w-100" style={{ maxWidth: 620 }}>
      <form className="p-4" onSubmit={handleSubmit(eliminarRutina)}>

        <div>

          <p>
            ¿Estás seguro que deseas eliminar la rutina de la zona muscular "
            {rutina.categoriaZonaMuscular?.nombreCategoriaZona}"?
          </p>

          <p className="text-danger">Esta acción no se puede deshacer.</p>

        </div>

        <BotonDinamico type="submit" classText="primary">
          Eliminar Rutina
        </BotonDinamico>

        {loading && (
          <p>
            Eliminando rutina...
          </p>
        )}

        {error && (
          <p className="text-danger mt-1">
            {error}
          </p>
        )}

        {successMessage && (
          <p className="mt-1">
            {successMessage}
          </p>
        )}

      </form>
    </div>
  </>
);
};

export default EliminarRutinaForm;