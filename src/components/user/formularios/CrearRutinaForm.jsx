import { useForm } from "react-hook-form";
import BotonCrear from "../../botones/BotonCrear";

const ejerciciosMock = [
  {
    _id: "1",
    nombreEjercicio: "Press banca"
  },
  {
    _id: "2",
    nombreEjercicio: "Remo"
  },
  {
    _id: "3",
    nombreEjercicio: "Dominadas"
  },
  {
    _id: "4",
    nombreEjercicio: "Curl bíceps"
  }
];

const zonasMock = [
  {
    _id: "1",
    nombreCategoriaZona: "Tren Superior"
  },
  {
    _id: "2",
    nombreCategoriaZona: "Tren Inferior"
  },
  {
    _id: "3",
    nombreCategoriaZona: "Zona Media"
  }
];

const CrearRutinaForm = () => {

  const {
    register,
    formState: { isDirty, isValid, isSubmitting }
  } = useForm({
    mode: "onChange"
  });

  return (
    <div className="tarjeta">

      <form>

        <div className="mb-4">
          <label className="form-label">
            Zona Muscular
          </label>

          <select
            className="form-select campo"
            {...register("categoriaZonaMuscular", {
              required: true
            })}
          >
            <option value="">
              Seleccione una zona
            </option>

            {zonasMock.map((zona) => (
              <option
                key={zona._id}
                value={zona._id}
              >
                {zona.nombreCategoriaZona}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">

          <label className="form-label">
            Ejercicios
          </label>

          {ejerciciosMock.map((ejercicio) => (
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