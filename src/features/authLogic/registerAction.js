import api from "../../api/api";

export const registrarUsuario = async (datosRegistro) => {
  try {

    const response = await api.post(
      "/auth/register",
      datosRegistro
    );

    return {
      success: true,
      data: response.data
    };

  } catch (error) {

    return {
      success: false,
      error:
        error.response?.data?.message ||
        "Error al registrar usuario"
    };

  }
};