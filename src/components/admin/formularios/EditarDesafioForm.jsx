import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import BotonDinamico from "../../botones/BotonDinamico";
import { useId } from "react";
import { editarDesafiosSchema } from "../../../validations/desafios.schema";
import { useDispatch, useSelector } from "react-redux";
import {
  editarDesafiosStart,
  editarDesafiosSuccess,
  editarDesafiosError,
} from "../../../features/adminLogic/desafios/desafiosSlice";
import DropdownCategoriaZonaMuscular from "../../dropdowns/DropdownCategoriaZonaMuscular";
import api from "../../../api/api";

//recibe el desafio seleccionado en la tabla desde {desafio}
const EditarDesafioForm = ({ desafio, onEditado }) => {
  const dispatch = useDispatch();
  //lo usamos para cuando el usuario haga click en el label haga foco en el field
  const nombreDesafioId = useId();
  const fechaLimiteId = useId();
  const puntosDesafioId = useId();

  //Lo usamos para verificar que el slice de categoriaZonaMuscular se actualice correctamente al
  // hacer la petición de creación, y mostrar mensajes de error o éxito según corresponda.
  const { loading, error, successMessage } = useSelector(
    (state) => state.desafiosStore,
  );

  //usamos a JOI para validar el formulario en tiempo real, y react-hook-form para manejar el estado del mismo.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: joiResolver(editarDesafiosSchema),
    mode: "onChange",
    //precargamos los input con valores
    defaultValues: {
      nombreDesafio: desafio.nombreDesafio,
      fechaLimite: desafio.fechaLimite ? desafio.fechaLimite.split("T")[0] : "",
      puntosDesafio: desafio.puntosDesafio,
      categoriaZonaMuscular: desafio.categoriaZonaMuscular?._id || "",
    },
  });

  const editarDesafio = async (data) => {
    console.log("Datos del formulario:", data);

    dispatch(editarDesafiosStart());

    try {
      const token = localStorage.getItem("token");

      const res = await api.patch(`/desafios/${desafio._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Respuesta del backend:", res.data);

      dispatch(editarDesafiosSuccess(res.data));
      onEditado();
    } catch (error) {
      console.log("Error al editar desafío:", error);

      dispatch(
        editarDesafiosError(
          error.response?.data?.message || "Error al editar el desafío",
        ),
      );
    }
  };

  return (
    <>
      <div className="tarjeta w-100" style={{ maxWidth: 620 }}>
        <form className="p-4" onSubmit={handleSubmit(editarDesafio)}>
          <div className="mb-3">
            <label htmlFor={nombreDesafioId} className="form-label">
              Nombre Desafío
            </label>
            <input
              type="text"
              id={nombreDesafioId}
              className="form-control campo"
              placeholder="Ej: Desafío Dominadas"
              {...register("nombreDesafio")}
            />
            {errors.nombreDesafio && (
              <p className="text-danger mt-1">{errors.nombreDesafio.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor={fechaLimiteId} className="form-label">
              Fecha Límite
            </label>
            <input
              type="date"
              id={fechaLimiteId}
              className="form-control campo"
              {...register("fechaLimite")}
            />
            {errors.fechaLimite && (
              <p className="text-danger mt-1">{errors.fechaLimite.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor={puntosDesafioId} className="form-label">
              Puntos
            </label>
            <input
              type="number"
              id={puntosDesafioId}
              className="form-control campo"
              placeholder={100}
              {...register("puntosDesafio")}
            />
            {errors.puntosDesafio && (
              <p className="text-danger mt-1">{errors.puntosDesafio.message}</p>
            )}
          </div>
          <DropdownCategoriaZonaMuscular desafio={desafio} register={register} />
          <BotonDinamico
            type="submit"
            disabled={isSubmitting || !isDirty || !isValid}
            classText="primary"
          >
            Guardar Cambios
          </BotonDinamico>
          {loading && <p>Editando desafio...</p>}
          {error && <p className="text-danger mt-1">{error}</p>}
          {successMessage && <p className="mt-1">{successMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default EditarDesafioForm;