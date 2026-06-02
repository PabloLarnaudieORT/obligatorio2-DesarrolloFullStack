import Joi from "joi";

export const crearRutinaSchema = Joi.object({
    idUsuarioCreador : Joi.string().required(),
    categoriaZonaMuscular : Joi.string().required()
});
