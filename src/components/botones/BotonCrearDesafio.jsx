const BotonCrearDesafio = ({isDirty, isValid, isSubmitting}) => {
  return (
    <>
    <button
      type="submit"
      className="btn btn-principal px-5"
      disabled={!isDirty || !isValid || isSubmitting}>
            Crear Desafío
          </button>
          </>
    )
}

export default BotonCrearDesafio;