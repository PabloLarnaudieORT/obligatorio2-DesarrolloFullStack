import { useForm } from "react-hook-form";
import { useId } from "react";
import BotonDinamico from "../../botones/BotonDinamico";
import { useDispatch } from "react-redux";
import {
  obtenerRutinasSuccess,
  crearRutinaError,
  crearRutinaStart,
  crearRutinaSuccess
} from "../../../features/userLogic/rutinas/rutinasSlice";
import { joiResolver } from "@hookform/resolvers/joi";
import { crearRutinaSchema } from "../../../validations/rutinas.schema";
import api from "../../../api/api";
import { jwtDecode } from "jwt-decode";
import DropdownCategoriaZonaMuscular from "../../../components/dropdowns/DropdownCategoriaZonaMuscular"

const CrearRutinaForm = () => {
  const nombreRutina = useId();

  const dispatch = useDispatch();


  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm({ resolver: joiResolver(crearRutinaSchema) });

  const crearRutinaSubmit = async (data) => {
    dispatch(crearRutinaStart());
    try {
      const token = localStorage.getItem("token");
      const tokenDecoded = jwtDecode(token);
      const dataConUsuario = {
        //precisamos pasarle el id
        ...data,
        idUsuarioCreador: tokenDecoded.id,
      };
      const res = await api.post("/rutinas", dataConUsuario, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(crearRutinaSuccess(res.data));
      const resRutinas = await api.get("/rutinas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(obtenerRutinasSuccess(resRutinas.data.rutinas.rutinas));
    } catch (error) {
      dispatch(
        crearRutinaError(
          error.response?.data?.message || "Error al crear la rutina",
        ),
      );
    }
  };

  return (
    <div className="tarjeta">
      <form onSubmit={handleSubmit(crearRutinaSubmit)}>
        <div className="mb-4">
          <label htmlFor={nombreRutina} className="form-label">
            Nombre Rutina
          </label>
          <input
            type="text"
            className="form-control campo"
            id={nombreRutina}
            placeholder="Ej: Tu nuva rutina"
            {...register("nombreRutina")}
          />
        </div>
        {errors.nombreRutina && (
          <p className="text-danger mt-1">{errors.nombreRutina.message}</p>
        )}

          <DropdownCategoriaZonaMuscular
            register={register}
          />
          {errors.categoriaZonaMuscular && (
            <p className="text-danger mt-1">
              {errors.categoriaZonaMuscular.message}
            </p>
          )}

        <div className="mb-4">
          <label htmlFor={nombreRutina} className="form-label">
            Nombre Rutina
          </label>
          <input
            type="text"
            className="form-control campo"
            id={nombreRutina}
            placeholder="Ej: Tu nuva rutina"
            {...register("nombreRutina")}
          />
        </div>
        {errors.nombreRutina && (
          <p className="text-danger mt-1">{errors.nombreRutina.message}</p>
        )}
        <BotonDinamico
          type="submit"
          isDirty={isDirty}
          isValid={isValid}
          isSubmitting={isSubmitting}
        >
          Crear Rutina
        </BotonDinamico>
      </form>
    </div>
  );
};

export default CrearRutinaForm;
