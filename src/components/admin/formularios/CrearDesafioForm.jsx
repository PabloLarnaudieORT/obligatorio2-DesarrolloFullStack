import BotonDinamico from "../../botones/BotonDinamico";
import DropdownCategoriaZonaMuscular from "../../dropdowns/DropdownCategoriaZonaMuscular";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useId } from "react";
import { crearDesafiosSchema } from "../../../validations/desafios.schema";
import { useDispatch, useSelector } from "react-redux";
import {
  crearDesafioStart,
  crearDesafioSuccess,
  crearDesafioError,
  obtenerDesafiosSuccess,
} from "../../../features/adminLogic/desafios/desafiosSlice";
import api from "../../../api/api";

const CrearDesafioForm = ({ desafio }) => {
  const dispatch = useDispatch();

  const { loading, error, successMessage } = useSelector(
    (state) => state.desafiosStore,
  );

  const nombreDesafioId = useId();
  const fechaLimiteId = useId();
  const puntosDesafioId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(crearDesafiosSchema),
    mode: "onChange",
  });

  const crearDesafioSubmit = async (data) => {
    console.log("!!! DATOS QUE VAN AL BACKEND:", data);
    dispatch(crearDesafioStart());

    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/desafios", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(crearDesafioSuccess(res.data));

      const resDesafios = await api.get("/desafios", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      dispatch(obtenerDesafiosSuccess(resDesafios.data.desafios));
      reset();
      
    } catch (error) {
      dispatch(
        crearDesafioError(
          error.response?.data?.message || "Error al crear el desafío",
        ),
      );
    }
  };

  return (
    <>
      <div className="tarjeta w-100" style={{ maxWidth: 620 }}>
        <form onSubmit={handleSubmit(crearDesafioSubmit)}>
          <div className="mb-3">
            <label htmlFor={nombreDesafioId} className="form-label">
              Nombre Desafío
            </label>
            <input
              type="text"
              className="form-control campo"
              id={nombreDesafioId}
              placeholder="Ej: Desafío Dominadas"
              {...register("nombreDesafio")}
            />
          </div>
          {errors.nombreDesafio && (
            <p className="text-danger mt-1">{errors.nombreDesafio.message}</p>
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

          <BotonDinamico type="submit">Crear Desafío</BotonDinamico>
          {loading && <p>Creando desafío...</p>}
          {error && <p className="text-danger mt-1">{error}</p>}
          {successMessage && <p className="mt-1">{successMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default CrearDesafioForm;