import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  desafio: {},
  desafiosObtenidos: [],
  desafioEditado: null,
  loading: false,
  error: null,
  successMessage: null,
};

const desafiosSlice = createSlice({
  name: "desafios",
  initialState,
  reducers: {
    obtenerDesafiosStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    obtenerDesafiosSuccess: (state, action) => {
      state.loading = false;
      state.desafiosObtenidos = action.payload;
      state.successMessage = null;
      state.error = null;
    },

    obtenerDesafiosError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    crearDesafioStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    crearDesafioSuccess: (state, action) => {
      state.loading = false;
      state.desafio = action.payload;
      state.successMessage = "Desafío creado correctamente";
      state.error = null;
    },

    crearDesafioError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
    editarDesafiosStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    editarDesafiosSuccess: (state, action) => {
      state.loading = false;
      state.desafioEditado = action.payload;

      //Esto sirve para actualizar la lista de desafíos obtenidos en la tabla después de editar un desafío, sin necesidad de volver a hacer la petición para obtener todos los desafíos.
      state.desafiosObtenidos = state.desafiosObtenidos.map((desafio) =>
        desafio._id === action.payload._id ? action.payload : desafio,
      );

      state.successMessage = "Desafío editado correctamente";
      state.error = null;
    },

    editarDesafiosError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    eliminarDesafiosStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    eliminarDesafiosSuccess: (state, action) => {
      state.loading = false;
      state.desafio = action.payload;
      state.successMessage = "Desafío eliminado correctamente";
      state.error = null;
    },

    eliminarDesafiosError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
  },
});

export const {
  crearDesafioStart,
  crearDesafioSuccess,
  crearDesafioError,
  editarDesafiosStart,
  editarDesafiosSuccess,
  editarDesafiosError,
  eliminarDesafiosStart,
  eliminarDesafiosSuccess,
  eliminarDesafiosError,
  obtenerDesafiosStart,
  obtenerDesafiosSuccess,
  obtenerDesafiosError,
} = desafiosSlice.actions;

export default desafiosSlice.reducer;