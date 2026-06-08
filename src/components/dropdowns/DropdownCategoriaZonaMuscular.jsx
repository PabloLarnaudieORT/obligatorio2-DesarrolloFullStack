import {
  obtenerCategoriaZonaMuscularStart,
  obtenerCategoriaZonaMuscularError,
  obtenerCategoriaZonaMuscularSuccess,
} from "../../features/adminLogic/categoriaZonaMuscular/categoriaZonaMuscularSlice";
import { useDispatch, useSelector } from "react-redux";
import { useId, useEffect } from "react";
import api from "../../api/api";

const DropdownCategoriaZonaMuscular = ({ desafio, register }) => {
  const dispatch = useDispatch();

  const categoriaZonaMuscularId = useId();

  //me traigo categorias para hacer el map
  const { categorias } = useSelector(
    (state) => state.categoriaZonaMuscularStore,
  );

  const cargarCategoriasZonaMuscular = async () => {
    // Aquí podrías despachar una acción para obtener las categorías de zona muscular si es necesario
    console.log("Cargando categorías de zona muscular...");
    dispatch(obtenerCategoriaZonaMuscularStart());
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/categoriasZonaMuscular", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      dispatch(obtenerCategoriaZonaMuscularSuccess(res.data.categorias));
    console.log(
  "CATEGORIAS:",
  res.data.categorias
);
    } catch (error) {
      console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
  console.log("TOKEN:", localStorage.getItem("token"));
      dispatch(
        obtenerCategoriaZonaMuscularError(
          error.response?.data?.message ||
            "Error al obtener categorías de zona muscular",
        ),
      );
    }
  };

  useEffect(() => {
    cargarCategoriasZonaMuscular();
  }, []);

  return (
    <div className="mb-4">
      <label htmlFor={categoriaZonaMuscularId} className="form-label">
        Categoría Zona Muscular
      </label>

      <select
        id={categoriaZonaMuscularId}
        className="form-select campo"
        defaultValue={desafio?.categoriaZonaMuscular?._id || ""}
        {...(register ? register("categoriaZonaMuscular") : {})}
      >
        <option value="">Seleccioná una categoría</option>
        {categorias?.map((categoria) => (
          <option key={categoria._id} value={categoria._id}>
            {categoria.nombreCategoriaZona}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownCategoriaZonaMuscular;
