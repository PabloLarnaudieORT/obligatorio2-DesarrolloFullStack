import { NavLink } from "react-router";

const AdminMenuHamburguesa = ({ menuAbierto }) => {
  return (
    <nav className={menuAbierto ? "sidebar" : "sidebar sidebar-cerrada"} aria-label="Menú administrador">
      <ul className="list-unstyled">
        <li>
          <NavLink to="/" className="text-decoration-none text-reset">
            Inicio
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/crear-categoria-zona-muscular"
            className="text-decoration-none acento"
          >
            Crear Categoría Zona Muscular
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/gestionar-desafios"
            className="text-decoration-none text-reset"
          >
            Gestionar Desafíos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminMenuHamburguesa;

