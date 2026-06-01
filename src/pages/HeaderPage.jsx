const HeaderPage = ({ onMenuClick }) => {
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
        <span>Bienvenido, Admin admin</span>
        <span className="avatar" aria-label="Administrador">
          👤
        </span>
      </div>
    </header>
  );
};

export default HeaderPage;
