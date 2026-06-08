import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  id: null,
  rol: null,
  usuario: null,

  isAuthenticated: false,

  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;

      state.token = action.payload.token;
      state.id = action.payload.id;
      state.rol = action.payload.rol;
      state.usuario = action.payload.usuario;

      state.isAuthenticated = true;

      state.error = null;
    },

    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.id = null;
      state.rol = null;
      state.usuario = null;

      state.isAuthenticated = false;

      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;