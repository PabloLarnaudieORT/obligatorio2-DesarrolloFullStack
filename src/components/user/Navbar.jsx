import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ alternarMenu }) => {
  const { usuario } = useSelector((state) => state.authStore);

  const nombreUsuario = usuario || localStorage.getItem("user") || "usuario";

  return (
    <header className="navbar">
      <button
        onClick={alternarMenu}
        className="menu-hamburguesa text-decoration-none text-white"
        type="button"
      >
        Menu
      </button>

      <div className="usuario-info">
        <span>Bienvenido/a, {nombreUsuario}</span>
        <Link to="/perfil" className="avatar text-decoration-none">
          Mi Perfil
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
