import React from 'react'
import Register from '../../components/user/formularios/Register';

const RegisterPage = () => {
  return (
    <>
    
  <div className="fondo-completo" />
  <main className="contenedor-flex">
    <div className="banner">
      <div className="logo-grande">
        IRON<span className="acento">LOG</span>
      </div>
      <h1>
        Tu cambio
        <br />
        empieza con
        <br />
        una decisión.
      </h1>
      <p>Completá tus datos y comenzá a transformar tu físico hoy mismo.</p>
    </div>
    <Register />
  </main>
</>

    
  )
}

export default RegisterPage