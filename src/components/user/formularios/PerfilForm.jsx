import { useForm } from "react-hook-form";

const PerfilForm = () => {
     const { register, formState: { isSubmitting, isDirty, isValid } } = useForm({
                mode: "onChange",
              });
  return (
    <div className="tarjeta w-100" style={{ maxWidth: 800 }}>
  <form className="row g-3">
    <div className="col-md-6">
      <label className="form-label">Nombre Usuario</label>
      <input type="text" className="form-control campo" defaultValue="Juan" />
    </div>
    <div className="col-md-6">
      <label className="form-label">Email</label>
      <input
        type="email"
        className="form-control campo"
        defaultValue="juan@mail.com"
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">Edad</label>
      <input type="number" className="form-control campo" defaultValue={25} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Altura</label>
      <input type="number" className="form-control campo" placeholder="cm" />
    </div>
    <div className="col-md-6">
      <label className="form-label">Peso</label>
      <input type="number" className="form-control campo" placeholder="kg" />
    </div>
    <div className="col-md-6">
      <label className="form-label">Plan</label>
      <div className="input-group">
        <input
          type="text"
          className="form-control campo"
          defaultValue="Plan Básico"
          readOnly=""
        />
        <button
          type="button"
          className="btn"
          style={{
            backgroundColor: "white",
            color: "var(--negro)",
            fontFamily: '"Oswald", sans-serif',
            fontWeight: 600,
            textTransform: "uppercase"
          }}
        >
          Cambiar Plan
        </button>
      </div>
    </div>
    <div className="col-md-6">
      <label className="form-label">Rol</label>
      <input
        type="text"
        className="form-control campo"
        defaultValue="Usuario"
      />
    </div>
    <div className="col-md-6">
      <label className="form-label">Puntos Acumulados</label>
      <input type="number" className="form-control campo" defaultValue={150} />
    </div>
    <div className="col-12 mt-4">
      <button
        type="button"
        className="btn"
        style={{
          backgroundColor: "white",
          color: "var(--negro)",
          fontFamily: '"Oswald", sans-serif',
          fontWeight: 600,
          textTransform: "uppercase"
        }}
      >
        Actualizar Todo
      </button>
    </div>
  </form>
</div>

  )
}

export default PerfilForm