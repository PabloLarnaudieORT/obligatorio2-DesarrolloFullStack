const InformeUso = () => {
  return (
    <div className="tarjeta">
      <h4>Uso del Plan</h4>

      <p>3 de 4 rutinas utilizadas</p>

      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: "75%" }}
        >
          75%
        </div>
      </div>
    </div>
  );
};

export default InformeUso;