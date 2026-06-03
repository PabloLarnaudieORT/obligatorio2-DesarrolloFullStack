import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useId } from "react";
import BotonDinamico from "../../../botones/BotonDinamico";
import { crearCategoriaZonaMuscularSchema } from "../../../../validations/crearCategoriaZonaMuscularValidator.schema";
import { useDispatch, useSelector } from "react-redux";
import {
  crearCategoriaZonaMuscularStart,
  crearCategoriaZonaMuscularSuccess,
  crearCategoriaZonaMuscularError,
} from "../../../../features/adminLogic/categoriaZonaMuscular/categoriaZonaMuscularSlice";
import api from "../../../../api/api";

const CrearCategoriaZonaMuscularForm = () => {
  const dispatch = useDispatch();
  //lo usamos para cuando el usuario haga click en el label haga foco en el field
  const nombreCategoriaZonaId = useId();

  //Lo usamos para verificar que el slice de categoriaZonaMuscular se actualice correctamente al
  // hacer la petición de creación, y mostrar mensajes de error o éxito según corresponda.
  const { loading, error, successMessage } = useSelector(
    (state) => state.categoriaZonaMuscularStore,
  );

  //usamos a JOI para validar el formulario en tiempo real, y react-hook-form para manejar el estado del mismo.
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    resolver: joiResolver(crearCategoriaZonaMuscularSchema),
    mode: "onChange",
  });

  const procesarForm = async (data) => {
    console.log("Datos del formulario:", data);

    dispatch(crearCategoriaZonaMuscularStart());

    try {
      const token = localStorage.getItem("token");

      const res = await api.post("/categoriasZonaMuscular", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Respuesta del backend:", res.data);

      dispatch(crearCategoriaZonaMuscularSuccess(res.data));
    } catch (error) {
      console.log("Error al crear categoría:", error);

      dispatch(
        crearCategoriaZonaMuscularError(
          error.response?.data?.message || "Error al crear la categoría",
        ),
      );
    }
  };

  return (
    <>
      <div className="tarjeta w-100" style={{ maxWidth: "620px" }}>
        <form onSubmit={handleSubmit(procesarForm)}>
          <div className="mb-4">
            <label htmlFor={nombreCategoriaZonaId} className="form-label">
              Nombre Categoría Zona Muscular
            </label>
            <input
              id={nombreCategoriaZonaId}
              type="text"
              className="form-control campo"
              placeholder="Ej: Tren superior"
              {...register("nombreCategoriaZona")}
            />
            {errors.nombreCategoriaZona && (
              <p className="text-danger mt-1">
                {errors.nombreCategoriaZona.message}
              </p>
            )}
          </div>

          <BotonDinamico
            type="submit"
            class="btn btn-primary"
            isDirty={isDirty}
            isValid={isValid}
            isSubmitting={isSubmitting}
          >
            Crear Categoría Zona Muscular
          </BotonDinamico>
          {loading && <p>Creando categoría...</p>}
          {error && <p className="text-danger mt-1">{error}</p>}
          {successMessage && <p className="mt-1">{successMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default CrearCategoriaZonaMuscularForm;
