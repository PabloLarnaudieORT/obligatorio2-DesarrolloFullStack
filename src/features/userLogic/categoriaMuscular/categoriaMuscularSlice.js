import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoriaMuscular: {},
  listaDeCategoriasMusculos: [],
  categoriaMuscularEditada: null,
  loading: false,
  error: null,
  successMessage: null,
};

const categoriaMuscular = createSlice({
  name: "categoriaMuscular",
  initialState,
  reducers: {
    obtenerCategoriaMuscularStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    obtenerCategoriaMuscularSuccess: (state, action) => {
      state.loading = false;
      state.listaDeCategoriasMusculos = action.payload;
      state.successMessage = null;
      state.error = null;
    },

    obtenerCategoriaMuscularError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    crearCategoriaMuscularStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    crearCategoriaMuscularSuccess: (state, action) => {
      state.loading = false;
      state.categoriaMuscular = action.payload;
      state.successMessage = "Categoria Muscular creada correctamente";
      state.error = null;
    },

    crearCategoriaMuscularError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
    editarCategoriaMuscularStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    editarCategoriaMuscularSuccess: (state, action) => {
      state.loading = false;
      state.categoriaMuscularEditada = action.payload;

      //Esto sirve para actualizar la lista de ejercicios obtenidos en la tabla después de editar un ejercicio, sin necesidad de volver a hacer la petición para obtener todos los ejercicios.
      state.listaDeCategoriasMusculos = state.listaDeCategoriasMusculos.map((categoriaMuscular) =>
        categoriaMuscular._id === action.payload._id ? action.payload : categoriaMuscular,
      );

      state.successMessage = "Categoria Muscular editada correctamente";
      state.error = null;
    },

    editarCategoriaMuscularError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    eliminarCategoriaMuscularStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    eliminarCategoriaMuscularSuccess: (state, action) => {
      state.loading = false;
      state.categoriaMuscular = action.payload;
      state.successMessage = "Categoria Muscular eliminada correctamente";
      state.error = null;
    },

    eliminarCategoriaMuscularError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
  },
});

export const {
  crearCategoriaMuscularStart,
  crearCategoriaMuscularSuccess,
  crearCategoriaMuscularError,
  editarCategoriaMuscularStart,
  editarCategoriaMuscularSuccess,
  editarCategoriaMuscularError,
  eliminarCategoriaMuscularStart,
  eliminarCategoriaMuscularSuccess,
  eliminarCategoriaMuscularError,
  obtenerCategoriaMuscularStart,
  obtenerCategoriaMuscularSuccess,
  obtenerCategoriaMuscularError,
} = categoriaMuscular.actions;

export default categoriaMuscular.reducer;