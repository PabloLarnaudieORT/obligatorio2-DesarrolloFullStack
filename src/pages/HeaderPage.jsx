import { useSelector } from "react-redux";

const HeaderPage = ({ onMenuClick }) => {
  const { usuario } = useSelector((state) => state.authStore);

  const nombreUsuario = usuario || localStorage.getItem("user") || "usuario";

  return (
    <header className="navbar">
      <button
        type="button"
        className="menu-hamburguesa"
        onClick={onMenuClick}
        aria-label="Abrir o cerrar menu administrador"
      >
        Menu
      </button>

      <div className="logo">
        <span>Bienvenido, {nombreUsuario}</span>
      </div>
    </header>
  );
};

export default HeaderPage;
