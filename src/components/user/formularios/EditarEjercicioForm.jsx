import { useForm } from "react-hook-form";
import BotonDinamico from "../../botones/BotonDinamico";
import { useId } from "react";
import { useDispatch } from "react-redux";
import {
  editarEjerciciosError,
  editarEjerciciosStart,
  editarEjerciciosSuccess,
} from "../../../features/userLogic/ejercicios/ejerciciosSlice";
import DropdownCategoriaMuscular from "../../../components/dropdowns/DropdownCategoriaMuscular";
import api from "../../../api/api";

//recibe el desafio seleccionado en la tabla desde {desafio}
const EditarEjercicioForm = ({ ejercicio, onEditado }) => {
  const dispatch = useDispatch();
  //lo usamos para cuando el usuario haga click en el label haga foco en el field
  const fechaId = useId();
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
    //precargamos los input con valores
    defaultValues: {
      nombreEjercicio: ejercicio.nombreEjercicio,
      fecha: ejercicio.fecha ? ejercicio.fecha.split("T")[0] : "",
      tipoDePeso: ejercicio.tipoDePeso,
      peso: ejercicio.peso,
      repeticiones: ejercicio.repeticiones,
      series: ejercicio.series,
      categoriaMusculo: ejercicio.categoriaMusculo,
    },
  });

  const editarEjercicioSubmit = async (data) => {
    console.log("EditarEjercicioTabla > editarDesafio > data: ", data);

    dispatch(editarEjerciciosStart());

    try {
      const token = localStorage.getItem("token");

      const res = await api.patch(`/ejercicios/${ejercicio._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(editarEjerciciosSuccess(res.data));
      onEditado();
    } catch (error) {
      dispatch(
        editarEjerciciosError(
          error.response?.data?.message || "Error al editar el desafío",
        ),
      );
    }
  };

  return (
    <>
      <div className="tarjeta w-100" style={{ maxWidth: 620 }}>
        <form onSubmit={handleSubmit(editarEjercicioSubmit)}>
          <div className="mb-3">
            <label htmlFor={nombreEjercicioId} className="form-label">
              Nombre Ejercicio
            </label>
            <input
              id={nombreEjercicioId}
              type="text"
              className="form-control campo"
              placeholder="Ej: Press de Banca"
              {...register("nombreEjercicio", { optional: true })}
            />
            {errors.nombreEjercicio && (
              <p className="text-danger mt-1">
                {errors.nombreEjercicio.message}
              </p>
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
              {...register("fecha", { optional: true })}
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
                {...register("tipoDePeso", { optional: true })}
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
                {...register("peso", { optional: true })}
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
                {...register("repeticiones", { optional: true })}
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
                {...register("series", { optional: true })}
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
            Editar Ejercicio
          </BotonDinamico>
        </form>
      </div>
    </>
  );
};

export default EditarEjercicioForm;
