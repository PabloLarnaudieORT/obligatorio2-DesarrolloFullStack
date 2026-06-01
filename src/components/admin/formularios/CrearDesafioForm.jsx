import BotonCrearDesafio from "../../botones/BotonCrearDesafio";
import DropdownCategoriaZonaMuscular from "../../dropdowns/DropdownCategoriaZonaMuscular";

const CrearDesafioForm = () => {
  return (
    <>
      <div className="tarjeta w-100" style={{ maxWidth: 620 }}>
        <form>
          <div className="mb-3">
            <label className="form-label">Nombre Desafío</label>
            <input
              type="text"
              className="form-control campo"
              placeholder="Ej: Desafío Dominadas"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha Límite</label>
            <input type="date" className="form-control campo" />
          </div>
          <div className="mb-3">
            <label className="form-label">Puntos</label>
            <input
              type="number"
              className="form-control campo"
              placeholder={100}
            />
          </div>
          <DropdownCategoriaZonaMuscular />
          <BotonCrearDesafio />
        </form>
      </div>
    </>
  );
};

export default CrearDesafioForm;
