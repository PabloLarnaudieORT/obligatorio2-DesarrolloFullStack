import { useDispatch, useSelector } from "react-redux";
import { useId, useEffect } from "react";
import {
  obtenerCategoriaMuscularStart,
  obtenerCategoriaMuscularSuccess,
  obtenerCategoriaMuscularError,
} from "../../features/userLogic/categoriaMuscularSlice";
import api from "../../api/api";

const DropdownCategoriaMuscular = ({ register, errors, required = true }) => {
  const dispatch = useDispatch();

  const { listaDeCategoriasMusculos } = useSelector(
    (state) => state.categoriaMuscularStore,
  );

  const categoriaMuscularId = useId();

  /* Aca sacamos esto por que el useForm ya esta siendo usado por su padre:
  // Que es Crear EjecicioForm, si lo creamos de nuevo estamos creando otro form.
  const {
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  */

  useEffect(() => {
    const obtenerCategoriasMusculo = async () => {
      dispatch(obtenerCategoriaMuscularStart());
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/categoriasMusculos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(
          obtenerCategoriaMuscularSuccess(res.data.categoriasMusculares),
        );
      } catch (error) {
        dispatch(
          obtenerCategoriaMuscularError(
            error.response?.data?.message ||
              "Error al obtener categorÃ­as musculares",
          ),
        );
      }
    };
    obtenerCategoriasMusculo();
  }, []);

  return (
    <>
      <div className="mb-4">
        <label htmlFor={categoriaMuscularId} className="form-label">
          CategorÃ­a Muscular
        </label>
        <select
          id={categoriaMuscularId}
          className="form-select campo"
          {...register("categoriaMusculo", {
            //hay que mirar validators de ejerccios como se llama la prop, en este caso categoriaMusculo.
            ...(required && {
              required: "Selecciona una categoria muscular",
            }),
          })}
        >
          <option value="">SeleccionÃ¡ una categorÃ­a</option>
          {listaDeCategoriasMusculos?.map((catMusc) => (
            <option key={catMusc._id} value={catMusc._id}>
              {catMusc.nombre}
            </option>
          ))}
        </select>
        {errors.categoriaMusculo && (
          <p className="text-danger mt-1">{errors.categoriaMusculo.message}</p>
        )}
      </div>
    </>
  );
};

export default DropdownCategoriaMuscular;

