const BotonCrear = ({isDirty, isValid, isSubmitting}) => {
  return (
    <button
      type="submit"
      className="btn btn-principal px-5"
      disabled={!isDirty || !isValid || isSubmitting}
    >
      CREAR
    </button>
  );
};

export default BotonCrear;
