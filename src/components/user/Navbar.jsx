import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Navbar = ({ alternarMenu }) => {

  const { usuario } = useSelector(
  state => state.authStore
);

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