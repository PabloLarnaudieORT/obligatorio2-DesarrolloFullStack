import api from "../../api/api";

export const crearRutinaCompleta = async (
  categoriaZonaMuscular,
  ejercicios
) => {

  try {

    const token =
  localStorage.getItem("token");

console.log("DATOS RUTINA", {
  categoriaZonaMuscular,
});
const rutinaResponse =
  await api.post(
  "/rutinas",
  {
    categoriaZonaMuscular,
  },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(rutinaResponse.data);

    const idRutina =
      rutinaResponse.data._doc._id;

    // AGREGA LOS EJERCICIOS

    for (const idEjercicio of ejercicios) {

      await api.post(
        "/rutina-ejercicios",
        {
          idRutina,
          idEjercicio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    }

    return {
      success: true,
    };

  } catch (error) {

  console.log(
    "STATUS:",
    error.response?.status
  );

  console.log(
    "DATA:",
    error.response?.data
  );

  console.log(
  "ERRORES VALIDACION:",
  error.response?.data?.error
);
  return {
    success: false,
    error:
      error.response?.data?.message ||
      "Error al crear rutina",
  };


  }

};


export const obtenerCantidadRutinas =
  async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/rutinas",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      return {
        success: true,
        total:
          response.data.rutinas.totalDeRutinas,
      };

    } catch (error) {

      return {
        success: false,
        total: 0,
      };

    }

};