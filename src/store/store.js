import { configureStore } from "@reduxjs/toolkit";
//Categorías Zona Muscular
import categoriaZonaMuscularReducer from "../features/adminLogic/categoriaZonaMuscular/categoriaZonaMuscularSlice";
//Categoria Muscular
import categoriaMuscularReducer from "../features/userLogic/categoriaMuscular/categoriaMuscularSlice"
//Desafios
import desafiosSliceReducer from "../features/adminLogic/desafios/desafiosSlice";
// Auth
import authReducer from "../features/authLogic/authSlice";
//Ejercicios
import ejerciciosSliceReducer from "../features/userLogic/ejercicios/ejerciciosSlice";
//Rutinas
import rutinasSliceReducer from "../features/userLogic/rutinas/rutinasSlice";

export const store = configureStore({
  reducer: {
    //Categorías Zona Muscular
    categoriaZonaMuscularStore: categoriaZonaMuscularReducer,
    //Categoria Muscular
    categoriaMuscularStore: categoriaMuscularReducer,
    //Desafios
    desafiosStore: desafiosSliceReducer,
    // Auth
    authStore: authReducer,
    // Ejercicios
    ejerciciosStore: ejerciciosSliceReducer,
    // Rutinas
    rutinasStore: rutinasSliceReducer,
  },
});
