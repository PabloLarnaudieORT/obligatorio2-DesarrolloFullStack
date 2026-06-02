const BotonDinamico = ({
  type = "button",
  onClick,
  disabled = false,
  children,
  classText = "primary",
  isDirty,
  isValid,
  isSubmitting,
}) => {
  const disabledPorFormulario =
    isDirty !== undefined && isValid !== undefined && isSubmitting !== undefined
      ? !isDirty || !isValid || isSubmitting
      : disabled;

  const claseBoton =
    classText === "text-danger" ? "btn btn-danger" : "btn btn-principal";

  return (
    <button
      type={type}
      className={`${claseBoton} px-2`}
      onClick={onClick}
      disabled={disabledPorFormulario}
    >
      {children}
    </button>
  );
};

export default BotonDinamico;