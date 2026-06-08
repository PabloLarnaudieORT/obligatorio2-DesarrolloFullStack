import { useEffect, useState } from "react";

import {
  obtenerCantidadRutinas,
} from "../../features/userLogic/rutinaAction";

const InformeUso = ({ plan }) => {

  const [rutinas, setRutinas] =
    useState(0);


  useEffect(() => {

    const cargarDatos =
      async () => {

        const resultado =
          await obtenerCantidadRutinas();

        if (resultado.success) {

          setRutinas(
            resultado.total
          );

        }


      };

    cargarDatos();

  }, []);

  const limite =
    plan === "premium"
      ? "∞"
      : 4;

  const porcentaje =
    plan === "premium"
      ? 100
      : (rutinas / 4) * 100;

  return (
    <div className="tarjeta">

      <h4>
        Uso del Plan
      </h4>

      <p>
        {plan === "premium"
          ? `${rutinas} rutinas creadas`
          : `${rutinas} de 4 rutinas utilizadas`}
      </p>

      {plan !== "premium" && (

  <div className="progress">

    <div
      className="progress-bar"
      style={{
        width: `${porcentaje}%`
      }}
    >
      {Math.round(
        porcentaje
      )}%
    </div>

  </div>

)}

    </div>
  );

};

export default InformeUso;