import {joiResolver} from "@hookform/resolvers/joi";
import {useForm} from "react-hook-form";
import BotonCrear from "../../botones/BotonCrear";
import {crearCategoriaZonaMuscularSchema} from "../../../validations/crearCategoriaZonaMuscularValidator.schema";

const CrearCategoriaZonaMuscularForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: joiResolver(crearCategoriaZonaMuscularSchema),
    mode: "onChange",
  });

  const procesarForm = (data) => {
    console.log("Datos del formulario:", data);
    // Aquí puedes agregar la lógica para enviar los datos al backend o realizar otras acciones necesarias
  };
  return (
    <>
      <div className="tarjeta w-100" style={{ maxWidth: "620px" }}>
        <form onSubmit={handleSubmit(procesarForm)}>
          <div className="mb-4">
            <label className="form-label">Nombre Categoría Zona Muscular</label>
            <input
              type="text"
              className="form-control campo"
              placeholder="Ej: Tren superior" {...register("nombreCategoriaZonaMuscular")}
            />
            {errors.nombreCategoriaZonaMuscular && (
              <p className="text-danger mt-1">
                {errors.nombreCategoriaZonaMuscular.message}
              </p>
            )}
          </div>

          <BotonCrear isDirty={isDirty} isValid={isValid} isSubmitting={isSubmitting} />
        </form>
      </div>
    </>
  );
};

export default CrearCategoriaZonaMuscularForm;
