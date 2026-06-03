import React from 'react'

const Paginacion = ({ paginaActual, totalPaginas, onCambiarPagina }) => {
  return (
    <nav aria-label="Paginado" className="mt-3">
      <ul className="pagination pagination-sm mb-0">
        {/* Botón Anterior */}
        <li className={`page-item ${paginaActual === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onCambiarPagina(paginaActual - 1)}
          >
            Anterior
          </button>
        </li>

        {/* Indicador de página actual */}
        <li className="page-item active">
          <span className="page-link">{paginaActual}</span>
        </li>

        {/* Botón Siguiente */}
        <li className={`page-item ${paginaActual >= totalPaginas ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={() => onCambiarPagina(paginaActual + 1)}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Paginacion