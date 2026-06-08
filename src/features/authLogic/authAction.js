import api from "../../api/api";
import { jwtDecode } from "jwt-decode";
import { loginStart, loginSuccess, loginError } from "./authSlice";
import { logout } from "./authSlice";


export const loginUsuario = (datosLogin) => {
  return async (dispatch) => {
    try {

      console.log("DATOS ENVIADOS:", datosLogin);
      dispatch(loginStart());

      const response = await api.post("/auth/login", datosLogin);

      const token = response.data.token;
      const decoded = jwtDecode(token);

     dispatch(
  loginSuccess({
          token,
          id: decoded.id,
          rol: decoded.rol,
          usuario: datosLogin.username,
        }),
);

      localStorage.setItem("token", token);
      localStorage.setItem("user", datosLogin.username);
      localStorage.setItem("rol", decoded.rol);
      
      return {
        token,
        id: decoded.id,
        rol: decoded.rol,
        usuario: datosLogin.username,
      };
    } catch (error) {

      console.log("ERROR COMPLETO:", error);

      console.log("response:", error.response);
      console.log("status:", error.response?.status);
      console.log("data:", error.response?.data);

      dispatch(
        loginError(
          error.response?.data?.message ||
          error.message ||
            "Error al iniciar sesión",
        ),
      );

      return false;
    }
  };
  };

  export const logoutUsuario = () => {

  return (dispatch) => {

    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("user");
    localStorage.removeItem("plan");
    dispatch(logout());

  };

};

