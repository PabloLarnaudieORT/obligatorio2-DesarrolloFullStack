import { useEffect, useState } from "react";

import {
  obtenerMiPerfil,
  cambiarPlanPremium,
} from "../../features/userLogic/usuarioAction";

const CambioPlan = ({
  plan,
  setPlan,
}) => {

  


  const actualizarPlan =
    async () => {

      const confirmar =
        window.confirm(
          "¿Deseás pasar a Premium?"
        );

      if (!confirmar) return;

      const resultado =
        await cambiarPlanPremium();

      if (resultado.success) {

        setPlan("premium");

    

        alert(
          "¡Ahora sos usuario Premium!"
        );

        

      } else {

        alert(
          resultado.error
        );

      }

    };

  return (
    <div className="tarjeta">

      <h4 className="mb-3">
        Plan Actual
      </h4>

      <p className="fw-bold text-uppercase">
        {plan}
      </p>

      {plan === "plus" ? (
        <>
          <p>
            Límite: 4 rutinas
          </p>

          <button
            onClick={
              actualizarPlan
            }
            className="btn btn-warning w-100"
          >
            Pasar a Premium
          </button>
        </>
      ) : (
        <>
          <p>
            Rutinas ilimitadas
          </p>

          <button
            disabled
            className="btn btn-success w-100"
          >
            Plan Premium Activo
          </button>
        </>
      )}

    </div>
  );
};

export default CambioPlan;