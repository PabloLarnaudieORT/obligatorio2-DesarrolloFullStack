
const HeaderPage = ({ onMenuClick }) => {

  const usuario =
    localStorage.getItem("user");
    
  return (
    <header className="navbar">
      <button
        type="button"
        className="menu-hamburguesa"
        onClick={onMenuClick}
        aria-label="Abrir o cerrar menú administrador"
      >
        ☰
      </button>
      <div className="logo">
        <span>Bienvenido, {usuario}</span>
        <span className="avatar" aria-label="Administrador">
          👤
        </span>
      </div>
    </header>
  );
};

export default HeaderPage;
