import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const obtenerMiPerfil = async () => {

  try {

    const token = localStorage.getItem("token");

    const { id } = jwtDecode(token);
    const response =
      await api.get(
        `/usuarios/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    return {
      success: true,
      usuario: response.data.usuario
    };

  } catch (error) {

    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Error al obtener perfil"
    };

  }

};

export const subirImagenPerfil = async (archivo) => {

  try {

    const formData = new FormData();

    formData.append(
      "imagen",
      archivo
    );

    const response = await api.post(
      "/uploads",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

    return {
      success: true,
      url: response.data.url
    };

  } catch (error) {

    return {
      success: false,
      error:
        error.response?.data?.error ||
        "Error al subir imagen"
    };

  }

};

export const actualizarMiPerfil = async (datos) => {

  try {

    const token = localStorage.getItem("token");

    const { id } = jwtDecode(token);

    const response = await api.patch(
      `/usuarios/${id}`,
      datos,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      usuario: response.data,
    };

  } catch (error) {

    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Error al actualizar perfil",
    };

  }

};

export const cambiarPlanPremium = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const { id } =
      jwtDecode(token);

    const response =
      await api.patch(
        `/usuarios/${id}/plan`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return {
      success: true,
      usuario:
        response.data.usuario,
    };

  } catch (error) {

    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Error al actualizar plan",
    };

  }

};