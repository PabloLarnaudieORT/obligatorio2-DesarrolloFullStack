import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ejercicio: {},
  listaDeEjercicios: [],
  ejercicioEditado: null,
  loading: false,
  error: null,
  successMessage: null,
};

const ejerciciosSlice = createSlice({
  name: "ejercicios",
  initialState,
  reducers: {
    obtenerEjerciciosStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    obtenerEjerciciosSuccess: (state, action) => {
      state.loading = false;
      state.ejerciciosObtenidos = action.payload;
      state.successMessage = null;
      state.error = null;
    },

    obtenerEjerciciosError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    crearEjercicioStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    crearEjercicioSuccess: (state, action) => {
      state.loading = false;
      state.ejercicio = action.payload;
      state.successMessage = "Ejercicio creado correctamente";
      state.error = null;
    },

    crearEjercicioError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
    editarEjerciciosStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    editarEjerciciosSuccess: (state, action) => {
      state.loading = false;
      state.ejercicioEditado = action.payload;

      //Esto sirve para actualizar la lista de ejercicios obtenidos en la tabla después de editar un ejercicio, sin necesidad de volver a hacer la petición para obtener todos los ejercicios.
      state.ejerciciosObtenidos = state.ejerciciosObtenidos.map((ejercicio) =>
        ejercicio._id === action.payload._id ? action.payload : ejercicio,
      );

      state.successMessage = "Ejercicio editado correctamente";
      state.error = null;
    },

    editarEjerciciosError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    eliminarEjerciciosStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    eliminarEjerciciosSuccess: (state, action) => {
      state.loading = false;
      state.ejercicio = action.payload;
      state.successMessage = "Ejercicio eliminado correctamente";
      state.error = null;
    },

    eliminarEjerciciosError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
  },
});

export const {
  crearEjercicioStart,
  crearEjercicioSuccess,
  crearEjercicioError,
  editarEjerciciosStart,
  editarEjerciciosSuccess,
  editarEjerciciosError,
  eliminarEjerciciosStart,
  eliminarEjerciciosSuccess,
  eliminarEjerciciosError,
  obtenerEjerciciosStart,
  obtenerEjerciciosSuccess,
  obtenerEjerciciosError,
} = ejerciciosSlice.actions;

export default ejerciciosSlice.reducer;