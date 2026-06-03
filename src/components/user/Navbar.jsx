import { Link } from 'react-router-dom';

const Navbar = ({ alternarMenu }) => {
  return (
    <header className="navbar">
      <button onClick={ alternarMenu } className="menu-hamburguesa text-decoration-none text-white">
        ☰
      </button>
      <div className="usuario-info">
        <span>Bienvenido, Usuario</span>
        <Link to="/perfil" className="avatar text-decoration-none">👤</Link>
      </div>
    </header>
  )
}

export default Navbar