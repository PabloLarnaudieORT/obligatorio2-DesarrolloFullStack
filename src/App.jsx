import { BrowserRouter, Routes, Route } from "react-router";
import NotFoundPage from "./pages/NotFoundPage";

{/* RUTAS ADMIN */ }
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import CrearCategoriaZonaMuscularPage from "./pages/admin/CrearCategoriaZonaMuscularPage";
import GestionarDesafiosPage from "./pages/admin/GestionarDesafiosPage";
import AdminContainerPage from "./pages/AdminContainerPage";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";

{/* RUTAS PÚBLICAS */ }
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

{/* RUTAS DE USER */ }
import UserContainerPage from "./pages/UserContainerPage";
import DashboardPage from "./pages/user/DashboardPage";
import PerfilPage from "./pages/user/PerfilPage";
import CrearCategoriaMuscularPage from "./pages/user/CrearCategoriaMuscPage";
import GestionEjerciciosPage from "./pages/user/GestionEjercicioPage";



function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* RUTAS PÚBLICAS */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
         
          {/* RUTAS ADMIN */}
          <Route
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminContainerPage />
    </ProtectedRoute>
  }
>
            <Route path="/admin" element={<AdminDashboardPage />} />
            
          </Route>
         
          {/* RUTAS DE USER */}
          <Route element={<ProtectedRoute allowedRoles={["user"]}>
      <UserContainerPage />
    </ProtectedRoute>} >

            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            <Route path="/crear-categoria-muscular" element={<CrearCategoriaMuscularPage />} />
            <Route path="/gestionar-ejercicios" element={<GestionEjerciciosPage />} />
          </Route>

          {/* RUTAS DE ERROR */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
