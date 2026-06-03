import React from 'react'
import BotonCrear from "../../botones/BotonCrear"
import { useForm } from "react-hook-form";

const CrearCatMuscForm = () => {
    const { register, formState: { isSubmitting, isDirty, isValid } } = useForm({
        mode: "onChange",
      });
  return (
<div className="tarjeta w-100" style={{ maxWidth: 600 }}>
  <form>
    <div className="mb-3">
      <label className="form-label">Nombre Categoría Muscular</label>
      <input
        type="text"
        className="form-control campo"
        placeholder="Ej: Biceps" {...register("nombreCategoria")}
      />
    </div>
     <BotonCrear isDirty={isDirty} isValid={isValid} isSubmitting={isSubmitting} />
  </form>
</div>
  )
}

export default CrearCatMuscForm