import { useForm } from "react-hook-form";
import BotonDinamico from "../../../botones/BotonDinamico";
import { useDispatch, useSelector } from "react-redux";
import {
  eliminarEjerciciosStart,
  eliminarEjerciciosSuccess,
  eliminarEjerciciosError,
} from "../../../features/userLogic/ejercicios/ejerciciosSlice"
import api from "../../../../api/api";

//recibe el desafio seleccionado en la tabla desde {desafio}
const EliminarEjercicioForm = ({ ejercicio, onEliminado }) => {
  const dispatch = useDispatch();

  //Lo usamos para verificar que el slice de categoriaZonaMuscular se actualice correctamente al
  // hacer la petición de creación, y mostrar mensajes de error o éxito según corresponda.
  const { loading, error, successMessage } = useSelector(
    (state) => state.ejerciciosStore,
  );

  //usamos a JOI para validar el formulario en tiempo real, y react-hook-form para manejar el estado del mismo.
  const {
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const eliminarEjercicio = async (data) => {
    console.log("EliminarEjercicioForm > eliminarEjercicio > data: ", data);

    dispatch(eliminarEjerciciosStart());

    try {
      const token = localStorage.getItem("token");

      const res = await api.delete(`/ejercicios/${ejercicio._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("EliminarEjercicioForm > eliminarEjercicio > res.data: ", res.data);

      dispatch(eliminarEjerciciosSuccess(res.data));
      onEliminado();
    } catch (error) {
      console.log("EliminarEjercicioForm > eliminarEjercicio > error: ", error);

      dispatch(
        eliminarEjerciciosError(
          error.response?.data?.message || "Error al eliminar el desafío",
        ),
      );
    }
  };

  return (
    <>
      <div className="tarjeta w-100" style={{ maxWidth: 620 }}>
        <form className="p-4" onSubmit={handleSubmit(eliminarEjercicio)}>
          <div>
            <p>
              ¿Estás seguro que deseas eliminar el ejercicio"
              {ejercicio.nombreEjercicio}"?
            </p>
            <p className="text-danger">Esta acción no se puede deshacer.</p>
          </div>
          <BotonDinamico
            type="submit"
            classText="primary"
          >
            Eliminar Ejercicio
          </BotonDinamico>
          {loading && <p>Eliminando ejercicio...</p>}
          {error && <p className="text-danger mt-1">{error}</p>}
          {successMessage && <p className="mt-1">{successMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default EliminarEjercicioForm;
