import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rutina: {},
  listaDeRutinas: [],
  rutinaEditada: null,
  loading: false,
  error: null,
  successMessage: null,
};

const rutinasSlice = createSlice({
  name: "rutinas",
  initialState,
  reducers: {
    obtenerRutinasStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    obtenerRutinasSuccess: (state, action) => {
      state.loading = false;
      state.listaDeRutinas = action.payload;
      state.successMessage = null;
      state.error = null;
    },

    obtenerRutinasError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    crearRutinaStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    crearRutinaSuccess: (state, action) => {
      state.loading = false;
      state.rutina = action.payload;
      state.successMessage = "Rutina creada correctamente";
      state.error = null;
    },

    crearRutinaError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
    editarRutinasStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    editarRutinasSuccess: (state, action) => {
      state.loading = false;
      state.rutinaEditada = action.payload;

      //Esto sirve para actualizar la lista de rutinas obtenidas en la tabla después de editar una rutina, sin necesidad de volver a hacer la petición para obtener todas las rutinas.
      state.listaDeRutinas = state.listaDeRutinas.map((rutina) =>
        rutina._id === action.payload._id ? action.payload : rutina,
      );

      state.successMessage = "Rutina editada correctamente";
      state.error = null;
    },

    editarRutinasError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },

    eliminarRutinasStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    eliminarRutinasSuccess: (state, action) => {
      state.loading = false;
      state.rutina = action.payload;
      state.successMessage = "Rutina eliminada correctamente";
      state.error = null;
    },

    eliminarRutinasError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.successMessage = null;
    },
  },
});

export const {
  crearRutinaStart,
  crearRutinaSuccess,
  crearRutinaError,
  editarRutinasStart,
  editarRutinasSuccess,
  editarRutinasError,
  eliminarRutinasStart,
  eliminarRutinasSuccess,
  eliminarRutinasError,
  obtenerRutinasStart,
  obtenerRutinasSuccess,
  obtenerRutinasError,
} = rutinasSlice.actions;

export default rutinasSlice.reducer;