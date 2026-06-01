const DropdownCategoriaZonaMuscular = () => {
  //Aca hay que hacer un get de todos los elementos que existan en categoria zona muscular

  return (
    <>
      <div className="mb-4">
        <label className="form-label">Categoría Zona Muscular</label>
        <select className="form-select campo">
          <option value="">Seleccioná una categoría</option>
          <option>Tren superior</option>
        </select>
      </div>
    </>
  );
};

export default DropdownCategoriaZonaMuscular;
