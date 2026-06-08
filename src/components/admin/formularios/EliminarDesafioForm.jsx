import { useForm } from "react-hook-form";
import BotonDinamico from "../../botones/BotonDinamico";
import { useDispatch, useSelector } from "react-redux";
import {
  eliminarDesafiosStart,
  eliminarDesafiosSuccess,
  eliminarDesafiosError,
} from "../../../features/adminLogic/desafios/desafiosSlice";
import api from "../../../api/api";

//recibe el desafio seleccionado en la tabla desde {desafio}
const EliminarDesafioForm = ({ desafio, onEliminado }) => {
  const dispatch = useDispatch();

  //Lo usamos para verificar que el slice de categoriaZonaMuscular se actualice correctamente al
  // hacer la petición de creación, y mostrar mensajes de error o éxito según corresponda.
  const { loading, error, successMessage } = useSelector(
    (state) => state.desafiosStore,
  );

  //usamos a JOI para validar el formulario en tiempo real, y react-hook-form para manejar el estado del mismo.
  const {
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const eliminarDesafioSubmit = async (data) => {

    dispatch(eliminarDesafiosStart());

    try {
      const token = localStorage.getItem("token");

      const res = await api.delete(`/desafios/${desafio._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Respuesta del backend:", res.data);

      dispatch(eliminarDesafiosSuccess(res.data));
      onEliminado();
    } catch (error) {
      console.log("Error al eliminar desafío:", error);

      dispatch(
        eliminarDesafiosError(
          error.response?.data?.message || "Error al eliminar el desafío",
        ),
      );
    }
  };

  return (
    <>
      <div className="tarjeta w-100" style={{ maxWidth: 620 }}>
        <form className="p-4" onSubmit={handleSubmit(eliminarDesafioSubmit)}>
          <div>
            <p>
              ¿Estás seguro que deseas eliminar el desafío "
              {desafio.nombreDesafio}"?
            </p>
            <p className="text-danger">Esta acción no se puede deshacer.</p>
          </div>
          <BotonDinamico
            type="submit"
            classText="primary"
          >
            Eliminar Desafío
          </BotonDinamico>
          {loading && <p>Eliminando desafío...</p>}
          {error && <p className="text-danger mt-1">{error}</p>}
          {successMessage && <p className="mt-1">{successMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default EliminarDesafioForm;
