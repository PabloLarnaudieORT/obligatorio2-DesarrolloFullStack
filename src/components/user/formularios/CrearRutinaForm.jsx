import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  obtenerEjerciciosStart,
  obtenerEjerciciosError,
} from "../../../features/userLogic/ejerciciosSlice";
import api from "../../../api/api";

import { useForm } from "react-hook-form";
import BotonCrear from "../../botones/BotonCrear";
import { crearRutinaCompleta } from "../../../features/userLogic/rutinaAction";
import DropdownCategoriaZonaMuscular from "../../dropdowns/DropdownCategoriaZonaMuscular";


const CrearRutinaForm = ({ setActualizarRutinas }) => {
  const dispatch = useDispatch();

  const [mensajeExito, setMensajeExito] =
    useState("");

  const [mensajeError, setMensajeError] =
    useState("");

  const [ejerciciosDisponibles, setEjerciciosDisponibles] =
    useState([]);

  const cargarEjercicios = async () => {
    dispatch(obtenerEjerciciosStart());

    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/ejercicios?limit=1000", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEjerciciosDisponibles(
        res.data.ejercicios.ejercicios || []
      );
    } catch (error) {
      dispatch(
        obtenerEjerciciosError(
          error.response?.data?.message ||
          "Error al obtener ejercicios"
        )
      );
    }
  };
  useEffect(() => {
    cargarEjercicios();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {
      isDirty,
      isValid,
      isSubmitting
    }
  } = useForm({
    mode: "onChange"
  });

  const ejerciciosSeleccionados =
    watch("ejercicios") || [];

  const hayEjercicios =
    ejerciciosSeleccionados.length > 0;


  const onSubmit = async (data) => {

    console.log("DATOS FORM RUTINA:");
    console.log(data);

    const ejercicios = [].concat(
      data.ejercicios || []
    );

    const resultado =
      await crearRutinaCompleta(
        data.categoriaZonaMuscular,
        ejercicios
      );

    if (resultado.success) {
      setMensajeExito("Rutina creada correctamente");

      setTimeout(() => {
        setMensajeExito("");
      }, 1000);

      reset();

      setActualizarRutinas(
        prev => !prev
      );

    } else {

      setMensajeError(
        resultado.error
      );

    }

  };

  return (
    <div className="tarjeta">

      <form onSubmit={handleSubmit(onSubmit)}>

        <DropdownCategoriaZonaMuscular
          register={register}
        />

        <div className="mb-4">

          <label className="form-label">
            Ejercicios
          </label>

          {ejerciciosDisponibles.map((ejercicio) => (
            <div
              key={ejercicio._id}
              className="form-check"
            >
              <input
                className="form-check-input"
                type="checkbox"
                value={ejercicio._id}
                {...register("ejercicios")}
              />

              <label className="form-check-label">
                {ejercicio.nombreEjercicio}
              </label>
            </div>
          ))}

        </div>

        <BotonCrear
          isDirty={isDirty}
          isValid={isValid && hayEjercicios}
          isSubmitting={isSubmitting}
        />

        {mensajeError && (
          <p className="text-danger mt-2">
            {mensajeError}
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

export default CrearRutinaForm;

