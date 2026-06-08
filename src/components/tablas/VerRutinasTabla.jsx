import BotonEditarCategoriaZonaMuscular from "../botones/BotonEditar";
import BotonEliminarCategoriaZonaMuscular from "../botones/BotonEliminar";
import Paginacion from "../botones/Paginacion";
import { useState } from "react";

const VerRutinasTabla = () => {
    const [pagina, setPagina] = useState(1);
    return (
        <div className="tarjeta mx-auto" style={{ maxWidth: 900 }}>
            {" "}
            <div className="table-responsive">
                <table className="table table-dark table-hover table-sm align-middle text-center">
                    <thead>
                        <tr>
                            <th>Zona Muscular</th>
                            <th>Ejercicios</th>
                            <th>Fecha Creación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

<tr>

  <td>Tren Superior</td>

  <td>
    Press banca
    <br />
    Remo
    <br />
    Dominadas
  </td>

  <td>02/06/2026</td>

  <td>
    <BotonEditarCategoriaZonaMuscular />
    <BotonEliminarCategoriaZonaMuscular />
  </td>

</tr>

<tr>

  <td>Tren Inferior</td>

  <td>
    Sentadilla
    <br />
    Peso muerto
  </td>

  <td>31/05/2026</td>

  <td>
    <BotonEditarCategoriaZonaMuscular />
    <BotonEliminarCategoriaZonaMuscular />
  </td>

</tr>

</tbody>
                </table>
            </div>
            <Paginacion
                paginaActual={pagina}
                totalPaginas={5} // Este número será dinámico cuando conectes con la API
                onCambiarPagina={setPagina}
            />
        </div>
  );
};

export default VerRutinasTabla;