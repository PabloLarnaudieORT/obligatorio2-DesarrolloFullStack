import { useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api/api";

import {
  obtenerCategoriaZonaMuscularStart,
  obtenerCategoriaZonaMuscularSuccess,
  obtenerCategoriaZonaMuscularError,
} from "../../features/adminLogic/categoriaZonaMuscular/categoriaZonaMuscularSlice";

const FiltroZonaMuscular = ({
  valor,
  onChange,
}) => {

  const dispatch = useDispatch();
  const categoriaId = useId();

  const { categorias } = useSelector(
    (state) =>
      state.categoriaZonaMuscularStore
  );

  const cargarCategorias =
    async () => {

      dispatch(
        obtenerCategoriaZonaMuscularStart()
      );

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await api.get(
            "/categoriasZonaMuscular",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        dispatch(
          obtenerCategoriaZonaMuscularSuccess(
            res.data.categorias
          )
        );

      } catch (error) {

        dispatch(
          obtenerCategoriaZonaMuscularError(
            error.response?.data?.message ||
            "Error al obtener categorías"
          )
        );

      }

    };

  useEffect(() => {
    cargarCategorias();
  }, []);

  return (
    <div className="mb-4">

      <label
        htmlFor={categoriaId}
        className="form-label"
      >
        Filtrar por zona muscular
      </label>

      <select
        id={categoriaId}
        className="form-select campo"
        value={valor}
        onChange={onChange}
        style={{ maxWidth: 260 }}
      >
        <option value="">
          Todas
        </option>

        {categorias.map(
          (categoria) => (
            <option
              key={categoria._id}
              value={categoria._id}
            >
              {categoria.nombreCategoriaZona}
            </option>
          )
        )}

      </select>

    </div>
  );
};

export default FiltroZonaMuscular;