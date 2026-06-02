import Joi from "joi";

export const crearEjercicioSchema = Joi.object({
    nombreEjercicio: Joi.string().required(),
    fecha: Joi.date().required(),
    tipoDePeso: Joi.string().valid("kilogramos", "libras").required(),
    peso: Joi.number().required(),
    repeticiones: Joi.number().required(),
    series: Joi.number().required(),
    categoriaMusculo: Joi.string().required(),
    idUsuarioCreador: Joi.string().required()
});