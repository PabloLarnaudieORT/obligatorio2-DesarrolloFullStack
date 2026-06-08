import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = ({ alternarMenu }) => {

  const usuario =
    localStorage.getItem("user");

  return (
    <header className="navbar">
      <button onClick={ alternarMenu } className="menu-hamburguesa text-decoration-none text-white">
        ☰
      </button>
      <div className="usuario-info">
        <span>Bienvenido/a, {usuario}</span>
        <Link to="/perfil" className="avatar text-decoration-none">👤</Link>
      </div>
    </header>
  )
}

export default Navbar