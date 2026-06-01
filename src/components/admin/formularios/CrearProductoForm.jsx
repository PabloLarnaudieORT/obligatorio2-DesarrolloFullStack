const CrearProductoForm = () => {
  return (
    <>
      <div className="tarjeta w-100" style={{ maxWidth: 620 }}>
        <form>
          <div className="mb-3">
            <label className="form-label">Nombre Producto</label>
            <input
              type="text"
              className="form-control campo"
              placeholder="Ej: Botella térmica"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Puntos Requeridos</label>
            <input
              type="number"
              className="form-control campo"
              placeholder={300}
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Beneficio</label>
            <input
              type="text"
              className="form-control campo"
              placeholder="Ej: Canje por puntos"
            />
          </div>
          <button type="button" className="btn btn-principal px-5">
            Crear Producto
          </button>
        </form>
      </div>
    </>
  );
};

export default CrearProductoForm;
