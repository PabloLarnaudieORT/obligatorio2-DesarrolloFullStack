import React from 'react'
import BotonCrear from "../../botones/BotonCrear"
import { useForm } from "react-hook-form";

const CrearEjercicioForm = () => {
    const { register, formState: { isSubmitting, isDirty, isValid } } = useForm({
            mode: "onChange",
          });
  return (
   <div className="tarjeta w-100" style={{ maxWidth: 600 }}>
      <form>
        <div className="mb-3">
          <label className="form-label">Nombre Ejercicio</label>
          <input
            type="text"
            className="form-control campo"
            placeholder="Ej: Press de Banca"
            {...register("nombreEjercicio", { required: true })}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Tipo de peso</label>
            <select className="form-select campo" {...register("tipoPeso")}>
              <option value="kg">Kilogramos (kg)</option>
              <option value="lbs">Libras (lbs)</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Peso</label>
            <input 
                type="number" 
                className="form-control campo" 
                placeholder="0" 
                {...register("peso", { required: true, min: 0 })} 
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Repeticiones</label>
            <input 
                type="number" 
                className="form-control campo" 
                placeholder="0" 
                {...register("repeticiones", { required: true, min: 1 })} 
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Series</label>
            <input 
                type="number" 
                className="form-control campo" 
                placeholder="0" 
                {...register("series", { required: true, min: 1 })} 
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Categoría Muscular</label>
          <select className="form-select campo" {...register("categoria", { required: true })}>
            <option value="">Seleccioná una categoría</option>
            <option value="pecho">Pecho</option>
            <option value="espalda">Espalda</option>
            <option value="piernas">Piernas</option>
          </select>
        </div>
     <BotonCrear isDirty={isDirty} isValid={isValid} isSubmitting={isSubmitting} />
  </form>
</div>

  )
}

export default CrearEjercicioForm