import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerEjerciciosStart,
  obtenerEjerciciosSuccess,
  obtenerEjerciciosError,
} from "../../../features/userLogic/ejerciciosSlice";
import api from "../../../api/api";

import { useForm } from "react-hook-form";
import BotonCrear from "../../botones/BotonCrear";
import { crearRutinaCompleta } from "../../../features/userLogic/rutinaAction";
import DropdownCategoriaZonaMuscular from "../../dropdowns/DropdownCategoriaZonaMuscular";


const CrearRutinaForm = () => {
const dispatch = useDispatch();

const { listaDeEjercicios } = useSelector(
  (state) => state.ejerciciosStore
);

const cargarEjercicios = async () => {
  dispatch(obtenerEjerciciosStart());

  try {
    const token = localStorage.getItem("token");

    const res = await api.get("/ejercicios?limit=1000", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(
      obtenerEjerciciosSuccess(
        res.data.ejercicios.ejercicios
      )
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
  formState: {
    isDirty,
    isValid,
    isSubmitting
  }
} = useForm({
  mode: "onChange"
});

const onSubmit = async (data) => {

  console.log("DATOS FORM RUTINA:");
  console.log(data);
  const resultado =
    await crearRutinaCompleta(
      data.categoriaZonaMuscular,
      data.ejercicios || []
    );

  if (resultado.success) {

    alert(
      "Rutina creada correctamente"
    );

    window.location.reload();

  } else {

    alert(resultado.error);

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

          {listaDeEjercicios.map((ejercicio) => (
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
          isValid={isValid}
          isSubmitting={isSubmitting}
        />

      </form>

    </div>
  );
};

export default CrearRutinaForm;