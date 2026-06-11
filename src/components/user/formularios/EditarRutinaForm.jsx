import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import BotonDinamico from "../../botones/BotonDinamico";

import {
    editarRutinasStart,
    editarRutinasSuccess,
    editarRutinasError,
} from "../../../features/userLogic/rutinas/rutinasSlice";

import {
    obtenerEjerciciosStart,
    obtenerEjerciciosSuccess,
    obtenerEjerciciosError,
} from "../../../features/userLogic/ejerciciosSlice";

import api from "../../../api/api";


//COMPONENTE PARA EDITAR UNA RUTINA, RECIBE LA RUTINA SELECCIONADA EN LA TABLA DESDE {RUTINA}
const EditarRutinaForm = ({
    rutina,
    onEditado,
}) => {

    const dispatch = useDispatch();

    //cargamos la lista de ejercicios para mostrar en el form
    const { listaDeEjercicios } = useSelector(
        (state) => state.ejerciciosStore
    );

    const cargarEjercicios = async () => {
        dispatch(obtenerEjerciciosStart());

        try {
            const token = localStorage.getItem("token");

            const res = await api.get(
                "/ejercicios?limit=1000",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(
                obtenerEjerciciosSuccess(
                    res.data.ejercicios.ejercicios
                )
            );

        } catch (error) {
            dispatch(
                obtenerEjerciciosError(
                    error.response?.data?.message ||
                    "Error al obtener ejercicios"
                )
            );
        }
    };

    useEffect(() => {
        cargarEjercicios();
    }, []);

    //React Hook Form para manejar el formulario de edición de rutina.
    //queremos que aparezcan los ejercicios que ya tiene la rutina seleccionada, por lo que usamos defaultValues para precargar el form con los ejercicios de la rutina. Para eso mapeamos los ejercicios de la rutina y obtenemos solo su id para setearlo en el checkbox.
    const {
        register,
        handleSubmit,
        formState: {
            isDirty,
            isValid,
            isSubmitting,
        },
    } = useForm({
        mode: "onChange",

        defaultValues: {
            ejercicios: rutina.ejercicios.map((ejercicio) =>
                ejercicio.idEjercicio._id),
        },
    });

    //SUbmit: al editar una rutina, lo que hacemos es comparar los ejercicios que ya tiene la rutina con los ejercicios que vienen en el form (que son los que el usuario seleccionó) y a partir de esa comparación determinamos qué ejercicios hay que agregar a la rutina y cuáles hay que quitar. Para eso hacemos dos filtros: uno para obtener los ejercicios nuevos que hay que agregar (los que están en el form pero no estaban originalmente en la rutina) y otro para obtener los ejercicios que hay que quitar (los que estaban originalmente en la rutina pero no están en el form). Luego hacemos las llamadas a la API correspondientes para agregar o quitar cada ejercicio.
    const editarRutinaSubmit = async (data) => {
        dispatch(editarRutinasStart());

        try {
            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const ejerciciosOriginales = rutina.ejercicios.map(
                (e) => e.idEjercicio._id
            );

            const ejerciciosNuevos = [].concat(
                data.ejercicios || []
            );

            //obtenemos los ejercicios que hay que agregar a la rutina (los que están en el form pero no estaban originalmente en la rutina)
            const ejerciciosAgregar = ejerciciosNuevos.filter((id) =>
                !ejerciciosOriginales.includes(id)
            );

            //obtenemos los ejercicios que hay que quitar de la rutina (los que estaban originalmente en la rutina pero no están en el form)
            const ejerciciosQuitar = rutina.ejercicios.filter((e) =>
                !ejerciciosNuevos.includes(e.idEjercicio._id)
            );

            //hacemos las llamadas a la API para agregar los ejercicios nuevos a la rutina
            for (const idEjercicio of ejerciciosAgregar) {

                await api.post("/rutina-ejercicios",
                    {
                        idRutina: rutina._id,
                        idEjercicio,
                    },
                    config
                );
            }

            //hacemos las llamadas a la API para quitar los ejercicios que ya no están en la rutina
            for (const ejercicio of ejerciciosQuitar) {

                await api.delete(`/rutina-ejercicios/${ejercicio._id}`,
                    config
                );
            }

            //obtenemos la rutina actualizada para actualizar el estado en el frontend

            dispatch(editarRutinasSuccess(rutina)
            );

            onEditado();

        } catch (error) {

            dispatch(editarRutinasError(error.response?.data?.message ||
                "Error al editar rutina"
            )
            );
        }
    };

    return (
  <div className="tarjeta w-100" style={{ maxWidth: 620 }}>
    <form onSubmit={handleSubmit(editarRutinaSubmit)}>
      <div className="mb-4">
        <label className="form-label">
          Ejercicios
        </label>

        {listaDeEjercicios.map((ejercicio) => (
          <div
            key={ejercicio._id}
            className="form-check"
          >
            <input
              className="form-check-input"
              type="checkbox"
              value={ejercicio._id}
              {...register("ejercicios")}
            />

            <label className="form-check-label">
              {ejercicio.nombreEjercicio}
            </label>
          </div>
        ))}
      </div>

      <BotonDinamico
        type="submit"
        isDirty={isDirty}
        isValid={isValid}
        isSubmitting={isSubmitting}
      >
        Guardar Cambios
      </BotonDinamico>
    </form>
  </div>
);
}
export default EditarRutinaForm;