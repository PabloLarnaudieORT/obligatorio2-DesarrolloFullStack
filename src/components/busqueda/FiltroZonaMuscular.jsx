import React from 'react';

const FiltroZonaMuscular = ({ valor, onChange }) => {
  return (
    <div className="mb-4">
      <label className="form-label">
        Filtrar por zona muscular
      </label>

      <select
        className="form-select campo"
        value={valor}
        onChange={onChange}
        style={{ maxWidth: 260 }}
      >
        {/* Opciones estáticas (Fijas) */}
        <option value="">Todas</option>
        <option value="superior">Tren Superior</option>
        <option value="inferior">Tren Inferior</option>
        <option value="media">Zona Media</option>
      </select>
    </div>
  );
};

export default FiltroZonaMuscular;