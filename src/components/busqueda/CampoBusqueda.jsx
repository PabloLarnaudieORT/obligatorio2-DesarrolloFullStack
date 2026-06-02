import { useId } from "react";

const CampoBusquedaCategoriaZonaMuscular = ({ valor, onChange }) => {
 const campoBusquedaId = useId();
  return (
    <div className="mb-4 d-flex align-items-center gap-2 flex-wrap">
      <label htmlFor={campoBusquedaId} className="form-label mb-0">Buscar Desafío:</label>
      <input
        id={campoBusquedaId}
        type="text"
        className="form-control campo"
        placeholder="Inserte un texto descriptivo"
        style={{ maxWidth: 260 }}
      />
    </div>
  );
};

export default CampoBusquedaCategoriaZonaMuscular;
