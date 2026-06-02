import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/admin/HomePage";
import CrearCategoriaZonaMuscularPage from "./pages/admin/CrearCategoriaZonaMuscularPage";
import NotFoundPage from "./pages/NotFoundPage";
import GestionarDesafiosPage from "./pages/admin/GestionarDesafiosPage";
import AdminContainerPage from "./pages/AdminContainerPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
//import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<AdminContainerPage />} /*element={<ProtectedRoute />}*/>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/crear-categoria-zona-muscular"
            element={<CrearCategoriaZonaMuscularPage />}
          />
          <Route path="/gestionar-desafios" element={<GestionarDesafiosPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
