import React from 'react'

const CambioPlan = () => {
  return (
    <div className="tarjeta">

      <h4 className="mb-3">
        Plan Actual
      </h4>

      <p className="fw-bold">
        PLUS
      </p>

      <p>
        Límite: 4 rutinas
      </p>

      <button className="btn btn-warning w-100">
        Pasar a Premium
      </button>

    </div>
  );
};

export default CambioPlan;