import { useState } from 'react';
import BotonEditarCategoriaZonaMuscular from "../botones/BotonEditar";
import BotonEliminarCategoriaZonaMuscular from "../botones/BotonEliminar";
import Paginacion from "../botones/Paginacion";

const VerEjerciciosTabla = () => {
    const [pagina, setPagina] = useState(1);
    return (
        <div className="tarjeta w-100" style={{ maxWidth: 1050 }}>
            <div className="table-responsive">
                <table className="table table-dark table-hover table-sm align-middle text-center">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo peso</th>
                            <th>Peso</th>
                            <th>Repeticiones</th>
                            <th>Serie</th>
                            <th>Categoría músculo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Press de Banca</td>
                            <td>kg</td>
                            <td>40</td>
                            <td>10</td>
                            <td>4</td>
                            <td>Pecho</td>
                            <td>
                                <BotonEditarCategoriaZonaMuscular />
                                <BotonEliminarCategoriaZonaMuscular />
                            </td>
                        </tr>
                        <tr>
                            <td>Sentadilla</td>
                            <td>kg</td>
                            <td>60</td>
                            <td>12</td>
                            <td>4</td>
                            <td>Piernas</td>
                            <td>
                                <BotonEditarCategoriaZonaMuscular />
                                <BotonEliminarCategoriaZonaMuscular />
                            </td>
                        </tr>
                        <tr>
                            <td>Remo</td>
                            <td>kg</td>
                            <td>35</td>
                            <td>10</td>
                            <td>3</td>
                            <td>Espalda</td>
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


    )
}

export default VerEjerciciosTabla