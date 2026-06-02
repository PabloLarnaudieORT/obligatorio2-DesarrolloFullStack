import { configureStore } from "@reduxjs/toolkit";
//Categorías Zona Muscular
import categoriaZonaMuscularReducer from "../features/adminLogic/categoriaZonaMuscular/categoriaZonaMuscularSlice";
//Desafios
import desafiosSliceReducer from "../features/adminLogic/desafios/desafiosSlice";

export const store = configureStore({
  reducer: {
    //Categorías Zona Muscular
    categoriaZonaMuscularStore: categoriaZonaMuscularReducer,
    //Desafios
    desafiosStore: desafiosSliceReducer,
  },
});
