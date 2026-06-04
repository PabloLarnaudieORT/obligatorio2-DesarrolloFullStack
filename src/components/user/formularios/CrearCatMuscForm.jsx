import { useDispatch } from "react-redux";
import BotonDinamico from "../../botones/BotonDinamico";
import { useForm } from "react-hook-form";
import { useEffect, useId } from "react";
import api from "../../../api/api";
import {
  crearCategoriaMuscularError,
  crearCategoriaMuscularStart,
  crearCategoriaMuscularSuccess,
  obtenerCategoriaMuscularSuccess
} from "../../../features/userLogic/categoriaMuscular/categoriaMuscularSlice";

const CrearCatMuscForm = () => {
  const nombreCatMuscId = useId();

  const dispatch = useDispatch();
  const crearCategoriaMuscularSubmit = async (data) => {
    dispatch(crearCategoriaMuscularStart(data));
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/categoriasMusculos", data, {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      });
      dispatch(crearCategoriaMuscularSuccess(res.data));

      //Quiero actualizar las tablas arriba, asique tengo que hacer un get
      const resCategorias = await api.get("/categoriasMusculos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        obtenerCategoriaMuscularSuccess(
          resCategorias.data.categoriasMusculares,
        ),
      );
    } catch (error) {
      dispatch(
        crearCategoriaMuscularError(
          error.response?.data?.message || "Error al crear categoria muscular",
        ),
      );
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {}, []);
  return (
    <div className="tarjeta w-100" style={{ maxWidth: 600 }}>
      <form onSubmit={handleSubmit(crearCategoriaMuscularSubmit)}>
        <div className="mb-3">
          <label htmlFor={nombreCatMuscId} className="form-label">
            Nombre Categoría Muscular
          </label>
          <input
            id={nombreCatMuscId}
            type="text"
            className="form-control campo"
            placeholder="Ej: Biceps"
            {...register("nombre")}
          />{" "}
          {errors.nombre && (
            <p className="text-danger mt-1">{errors.nombre.message}</p>
          )}
        </div>
        <BotonDinamico
          type="submit"
          isDirty={isDirty}
          isValid={isValid}
          isSubmitting={isSubmitting}
        >
          Crear Categoria Musuclar
        </BotonDinamico>
      </form>
    </div>
  );
};

export default CrearCatMuscForm;
