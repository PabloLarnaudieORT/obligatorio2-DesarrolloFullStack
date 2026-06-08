import { NavLink, useNavigate } from "react-router";
import { useDispatch } from 'react-redux';

import { logoutUsuario } from '../../features/authLogic/authAction';

const AdminMenuHamburguesa = ({ menuAbierto }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    dispatch(logoutUsuario());
    navigate("/");
  };

  return (
    <nav className={menuAbierto ? "sidebar" : "sidebar sidebar-cerrada"} aria-label="Menú administrador">
      <ul className="list-unstyled">
        <li>
          <NavLink to="/admin" className="text-decoration-none text-reset">
            Inicio
          </NavLink>
        </li>

        <li className="mt-4"> <button onClick={cerrarSesion} className="btn btn-danger w-100">
            Cerrar sesión
          </button>
          </li>
      </ul>
    </nav>
  );
};

export default AdminMenuHamburguesa;