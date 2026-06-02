import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categorias: [],
  categoriaCreada: null,
  loading: false,
  error: null,
  successMessage: null,
};

const categoriaZonaMuscularSlice = createSlice({
  name: "categoriaZonaMuscular",
  initialState,
  reducers: {
    crearCategoriaZonaMuscularStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    crearCategoriaZonaMuscularSuccess: (state, action) => {
      state.loading = false;
      state.categoriaCreada = action.payload;
      state.successMessage = "Categoría creada correctamente";
      state.error = null;
    },

    crearCategoriaZonaMuscularError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
    obtenerCategoriaZonaMuscularStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    obtenerCategoriaZonaMuscularSuccess: (state, action) => {
      state.loading = false;
      state.categorias = action.payload;
      state.successMessage = null;
      state.error = null;
    },

    obtenerCategoriaZonaMuscularError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
  },
});

export const {
  crearCategoriaZonaMuscularStart,
  crearCategoriaZonaMuscularSuccess,
  crearCategoriaZonaMuscularError,
  obtenerCategoriaZonaMuscularStart,
  obtenerCategoriaZonaMuscularSuccess,
  obtenerCategoriaZonaMuscularError,
} = categoriaZonaMuscularSlice.actions;

export default categoriaZonaMuscularSlice.reducer;
