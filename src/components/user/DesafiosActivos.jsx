import React from 'react'

const DesafiosActivos = () => {
    const desafios = [
    { id: 1, titulo: "Desafío Dominadas", descripcion: "Completá 20 en 10 días", img: "img/domi.jpg" }
  ];

  return (
    <>
      <h3>Desafíos activos</h3>
      <div className="lista-desafios">
        {desafios.map((d) => (
          <div key={d.id} className="tarjeta-desafio">
            <img src={d.img} alt={d.titulo} />
            <div className="info-desafio text-white">
              <h5 className="text-white">{d.titulo}</h5>
              <p className="text-white">{d.descripcion}</p>
              <button className="btn-amarillo">Comenzar</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default DesafiosActivos