import BotonDinamico from "../../botones/BotonDinamico";
import DropdownCategoriaZonaMuscular from "../../dropdowns/DropdownCategoriaZonaMuscular";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useId } from "react";
import { crearDesafiosSchema } from "../../../validations/desafios.schema";
import { useDispatch, useSelector } from "react-redux";
import {
  crearEjercicioStart,
  crearEjercicioSuccess,
  crearEjercicioError,
  obtenerEjerciciosSuccess,
  editarEjercicioStart,
  editarEjercicioSuccess,
  editarEjercicioError,
} from "../../../../features/adminLogic/ejercicios/ejerciciosSlice";
import api from "../../../api/api";

const CrearEjercicioForm = ({ desafio }) => {
  const dispatch = useDispatch();

  const { loading, error, successMessage } = useSelector(
    (state) => state.ejerciciosStore,
  );

  const nombreEjercicioId = useId();
  const fechaLimiteId = useId();
  const puntosDesafioId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(crearDesafiosSchema),
    mode: "onChange",
  });

  const crearEjercicioSubmit = async (data) => {
    dispatch(crearEjercicioStart());

    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/ejercicios", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(crearEjercicioSuccess(res.data));
      const resEjercicios = await api.get("/ejercicios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(obtenerEjerciciosSuccess(resEjercicios.data.ejercicios));
    } catch (error) {
      dispatch(
        crearEjercicioError(
          error.response?.data?.message || "Error al crear el ejercicio",
        ),
      );
    }
  };

  return (
    <>
      <div className="tarjeta w-100" style={{ maxWidth: 620 }}>
        <form onSubmit={handleSubmit(crearEjercicioSubmit)}>
          <div className="mb-3">
            <label htmlFor={nombreEjercicioId} className="form-label">
              Nombre Ejercicio
            </label>
            <input
              type="text"
              className="form-control campo"
              id={nombreEjercicioId}
              placeholder="Ej: Ejercicio Dominadas"
              {...register("nombreEjercicio")}
            />
          </div>
          {errors.nombreEjercicio && (
            <p className="text-danger mt-1">{errors.nombreEjercicio.message}</p>
          )}
          <div className="mb-3">
            <label htmlFor={fechaLimiteId} className="form-label">
              Fecha Límite
            </label>
            <input
              type="date"
              className="form-control campo"
              id={fechaLimiteId}
              {...register("fechaLimite")}
            />
          </div>
          {errors.fechaLimite && (
            <p className="text-danger mt-1">{errors.fechaLimite.message}</p>
          )}
          <div className="mb-3">
            <label htmlFor={puntosDesafioId} className="form-label">
              Puntos
            </label>
            <input
              type="number"
              className="form-control campo"
              id={puntosDesafioId}
              placeholder={100}
              {...register("puntosDesafio")}
            />
          </div>
          {errors.puntosDesafio && (
            <p className="text-danger mt-1">{errors.puntosDesafio.message}</p>
          )}
          <DropdownCategoriaZonaMuscular
            desafio={desafio}
            register={register}
          />
          {errors.categoriaZonaMuscular && (
            <p className="text-danger mt-1">
              {errors.categoriaZonaMuscular.message}
            </p>
          )}

          <BotonDinamico type="submit">Crear Ejercicio</BotonDinamico>
          {loading && <p>Creando ejercicio...</p>}
          {error && <p className="text-danger mt-1">{error}</p>}
          {successMessage && <p className="mt-1">{successMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default CrearEjercicioForm;
