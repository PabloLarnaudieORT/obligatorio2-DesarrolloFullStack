import BotonEditarCategoriaZonaMuscular from "../botones/BotonEditarCategoriaZonaMuscular";
import BotonEliminarCategoriaZonaMuscular from "../botones/BotonEliminarCategoriaZonaMuscular";

const GestionarProductosTabla = () => {
  //aca hay que cargar la tabla dinamicamente

  return (
    <>
      <div className="tarjeta w-100 mb-4" style={{ maxWidth: 950 }}>
        <div className="table-responsive">
          <table className="table table-dark table-hover table-sm align-middle text-center">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha Creación</th>
                <th>Fecha Límite</th>
                <th>Puntos</th>
                <th>Categoría Zona Muscular</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>

              <p>Rellenarlo dinamicamente</p>
              <tr>
                <td>Mock - Sentadillas</td>
                <td>28/05/2026</td>
                <td>12/06/2026</td>
                <td>90</td>
                <td>Tren inferior</td>
                <td>
                  <BotonEditarCategoriaZonaMuscular />
                  <BotonEliminarCategoriaZonaMuscular />
                </td>
              </tr>

              <p>Rellenarlo dinamicamente</p>
              <tr>
                <td>Mock - Sentadillas</td>
                <td>28/05/2026</td>
                <td>12/06/2026</td>
                <td>90</td>
                <td>Tren inferior</td>
                <td>
                  <BotonEditarCategoriaZonaMuscular />
                  <BotonEliminarCategoriaZonaMuscular />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default GestionarProductosTabla;
