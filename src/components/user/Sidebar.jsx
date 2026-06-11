import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutUsuario } from '../../features/authLogic/authAction';


const Sidebar = ({ abierto }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cerrarSesion = () => {

    dispatch(logoutUsuario());

    navigate("/");
};
    return (
      <nav className={abierto ? "sidebar" : "sidebar sidebar-cerrada"} aria-label="Menú usuario">
        <ul className="list-unstyled">
          <li><Link to="/dashboard" className="text-decoration-none acento">Homepage</Link></li>
          <li><Link to="/perfil" className="text-decoration-none text-reset">Mi Perfil</Link></li>
          <li className="mt-4"> <button onClick={cerrarSesion} className="btn btn-danger w-100">
            Cerrar sesión
          </button>
          </li>
        </ul>
      </nav>
    )
  }

  export default Sidebar;