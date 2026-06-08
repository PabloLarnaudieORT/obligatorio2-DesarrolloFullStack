import { useDispatch, useSelector } from "react-redux";
import BotonDinamico from "../../botones/BotonDinamico";
import { useForm } from "react-hook-form";
import { useId, useState } from "react";
import api from "../../../api/api";
import {
  crearCategoriaMuscularError,
  crearCategoriaMuscularStart,
  crearCategoriaMuscularSuccess,
  obtenerCategoriaMuscularSuccess
} from "../../../features/userLogic/categoriaMuscularSlice";

const CrearCatMuscForm = () => {
  const nombreCatMuscId = useId();

  const [mensajeExito, setMensajeExito] = useState("");

  const dispatch = useDispatch();

  const crearCategoriaMuscularSubmit = async (data) => {

    setMensajeExito("");

    dispatch(crearCategoriaMuscularStart());

    try {

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/categoriasMusculos",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        crearCategoriaMuscularSuccess(
          res.data
        )
      );

      const resCategorias = await api.get(
        "/categoriasMusculos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        obtenerCategoriaMuscularSuccess(
          resCategorias.data.categoriasMusculares
        )
      );

      setMensajeExito(
        "Categoría muscular creada correctamente"
      );

      reset();

    } catch (error) {

      dispatch(
        crearCategoriaMuscularError(
          error.response?.data?.message ||
          "Error al crear categoría muscular. Podría estar usando un nombre ya existente."
        )
      );

    }

  };

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      isDirty,
      isValid,
    },
  } = useForm({
    mode: "onChange",
  });

  const {
    error,
  } = useSelector(
    (state) => state.categoriaMuscularStore
  );

  return (
    <div
      className="tarjeta w-100"
      style={{ maxWidth: 600 }}
    >

      <form
        onSubmit={handleSubmit(
          crearCategoriaMuscularSubmit
        )}
      >

        <div className="mb-3">

          <label
            htmlFor={nombreCatMuscId}
            className="form-label"
          >
            Nombre Categoría Muscular
          </label>

          <input
            id={nombreCatMuscId}
            type="text"
            className="form-control campo"
            placeholder="Ej: Biceps"
            {...register("nombre")}
          />

          {errors.nombre && (
            <p className="text-danger mt-1">
              {errors.nombre.message}
            </p>
          )}

        </div>

        <BotonDinamico
          type="submit"
          isDirty={isDirty}
          isValid={isValid}
          isSubmitting={isSubmitting}
        >
          Crear Categoría Muscular
        </BotonDinamico>

        {error && (
          <p className="text-danger mt-2">
            {error}
          </p>
        )}

        {mensajeExito && (
          <p className="text-success mt-2">
            {mensajeExito}
          </p>
        )}

      </form>

    </div>
  );
};

export default CrearCatMuscForm;