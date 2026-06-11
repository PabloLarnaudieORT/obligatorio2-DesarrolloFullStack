import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {

  const token =
    localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  let rol = null;

  try {

    const decoded =
      jwtDecode(token);

    rol = decoded.rol;

  } catch {

    return <Navigate to="/" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(rol)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;