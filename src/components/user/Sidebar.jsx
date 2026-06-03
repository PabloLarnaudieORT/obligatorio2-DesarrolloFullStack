import { Link } from 'react-router-dom';

const Sidebar = ({ abierto }) => {
  return (
    <nav className={abierto ? "sidebar" : "sidebar sidebar-cerrada"} aria-label="Menú usuario">
      <ul className="list-unstyled">
        <li><Link to="/dashboard" className="text-decoration-none acento">Homepage</Link></li>
        <li><Link to="/perfil" className="text-decoration-none text-reset">Mi Perfil</Link></li>
        <li><Link to="/crear-categoria-muscular" className="text-decoration-none acento">Crear Categoría Muscular</Link></li>
        <li><Link to="/gestionar-ejercicios" className="text-decoration-none text-reset">Gestionar Ejercicios</Link></li>
      </ul>
    </nav>
  )
}

export default Sidebar