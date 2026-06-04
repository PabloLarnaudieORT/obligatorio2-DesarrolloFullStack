import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtenerDesafiosError,
  obtenerDesafiosStart,
  obtenerDesafiosSuccess,
} from "../../features/adminLogic/desafios/desafiosSlice";
import api from "../../api/api";

const VerDesafiosTabla = () => {
  const dispatch = useDispatch();
  const { desafiosObtenidos, loading, error } = useSelector(
    (state) => state.desafiosStore,
  );

  const obtenerListaDeDesafios = async () => {
    dispatch(obtenerDesafiosStart());
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/desafios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("VerDesafiosTabla > id decoded > res: ", res);
      console.log("VerDesafiosTabla > id decoded > res.data: ", res.data);
      dispatch(obtenerDesafiosSuccess(res.data.desafios));
    } catch (error) {
      dispatch(
        obtenerDesafiosError(
          error.response?.data?.message || "Error al obtener los desafíos",
        ),
      );
    }
  };

  useEffect(() => {
    obtenerListaDeDesafios();
  }, []);
  return (
    <div className="tarjeta w-100 mb-4" style={{ maxWidth: 950 }}>
      <div className="table-responsive">
        <table className="table table-dark table-hover table-sm align-middle text-center">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha Creación</th>
              <th>Fecha Límite</th>
              <th>Puntos</th>
              <th>Categoría Zona Muscular</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="6">Cargando desafíos...</td>
              </tr>
            )}

            {error && (
              <tr>
                <td colSpan="6" className="text-danger">
                  {error}
                </td>
              </tr>
            )}

            {!loading && !error && desafiosObtenidos.length === 0 && (
              <tr>
                <td colSpan="6">No hay desafíos cargados</td>
              </tr>
            )}

            {!loading &&
              !error &&
              desafiosObtenidos.map((desafio) => (
                <tr key={desafio._id}>
                  <td>{desafio.nombreDesafio}</td>
                  <td>
                    {new Date(desafio.fechaCreacion).toLocaleDateString()}
                  </td>
                  <td>{new Date(desafio.fechaLimite).toLocaleDateString()}</td>
                  <td>{desafio.puntosDesafio}</td>
                  <td>
                    {desafio.categoriaZonaMuscular?.nombreCategoriaZona ||
                      "Sin categoría"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerDesafiosTabla;
