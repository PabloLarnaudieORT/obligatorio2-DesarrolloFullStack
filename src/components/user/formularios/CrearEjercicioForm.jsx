import { useDispatch } from "react-redux";
import BotonDinamico from "../../botones/BotonDinamico";
import { useForm } from "react-hook-form";
import { useId } from "react";
import {
  crearEjercicioStart,
  crearEjercicioSuccess,
  crearEjercicioError,
} from "../../../features/userLogic/ejercicios/ejerciciosSlice";
import api from "../../../api/api";
import DropdownCategoriaMuscular from "../../dropdowns/DropdownCategoriaMuscular";
import { jwtDecode } from "jwt-decode";

const CrearEjercicioForm = () => {
  const dispatch = useDispatch();

  const fechaId = useId()
  const nombreEjercicioId = useId();
  const tipoPesoId = useId();
  const pesoId = useId();
  const seriesId = useId();
  const repeticionesId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });

  const crearEjercicioSubmit = async (data) => {
    dispatch(crearEjercicioStart(data));
    try {
      const token = localStorage.getItem("token");
      const tokenDecoded = jwtDecode(token);
      const dataConUsuario = {
        //precisamos pasarle el id
        ...data,
        idUsuarioCreador: tokenDecoded.id,
      };
      const res = api.post("/ejercicios", dataConUsuario, {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      });
      dispatch(crearEjercicioSuccess(res.data));
    } catch (error) {
      dispatch(
        crearEjercicioError(
          error.response?.data?.message || "Error al crear ejercicio",
        ),
      );
    }
  };

  return (
    <div className="tarjeta w-100" style={{ maxWidth: 600 }}>
      <form onSubmit={handleSubmit(crearEjercicioSubmit)}>
        <div className="mb-3">
          <label htmlFor={nombreEjercicioId} className="form-label">
            Nombre Ejercicio
          </label>
          <input
            id={nombreEjercicioId}
            type="text"
            className="form-control campo"
            placeholder="Ej: Press de Banca"
            {...register("nombreEjercicio", { required: true })}
          />
          {errors.nombreEjercicio && (
            <p className="text-danger mt-1">{errors.nombreEjercicio.message}</p>
          )}
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor={fechaId} className="form-label">
            Fecha
          </label>
          <input
            id={fechaId}
            type="date"
            className="form-control campo"
            placeholder="0"
            className="form-select campo"
            {...register("fecha")}
          ></input>
          {errors.fecha && (
            <p className="text-danger mt-1">{errors.fecha.message}</p>
          )}
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor={tipoPesoId} className="form-label">
              Tipo de peso
            </label>
            <select
              id={tipoPesoId}
              className="form-select campo"
              {...register("tipoDePeso")}
            >
              <option value="kilogramos">Kilogramos (kg)</option>
              <option value="libras">Libras (lbs)</option>
            </select>
            {errors.tipoDePeso && (
              <p className="text-danger mt-1">{errors.tipoDePeso.message}</p>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor={pesoId} className="form-label">
              Peso
            </label>
            <input
              id={pesoId}
              type="number"
              className="form-control campo"
              placeholder="0"
              {...register("peso", { required: true, min: 0 })}
            />
          </div>
          {errors.peso && (
            <p className="text-danger mt-1">{errors.peso.message}</p>
          )}
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor={repeticionesId} className="form-label">
              Repeticiones
            </label>
            <input
              id={repeticionesId}
              type="number"
              className="form-control campo"
              placeholder="0"
              {...register("repeticiones", { required: true, min: 1 })}
            />
          </div>
          {errors.repeticiones && (
            <p className="text-danger mt-1">{errors.repeticiones.message}</p>
          )}

          <div className="col-md-6 mb-3">
            <label htmlFor={seriesId} className="form-label">
              Series
            </label>
            <input
              id={seriesId}
              type="number"
              className="form-control campo"
              placeholder="0"
              {...register("series", { required: true, min: 1 })}
            />
          </div>
          {errors.series && (
            <p className="text-danger mt-1">{errors.series.message}</p>
          )}
        </div>
        <DropdownCategoriaMuscular register={register} errors={errors} />
        <BotonDinamico
          type="submit"
          isDirty={isDirty}
          isValid={isValid}
          isSubmitting={isSubmitting}
        >
          Crear Ejercicio
        </BotonDinamico>
      </form>
    </div>
  );
};

export default CrearEjercicioForm;
