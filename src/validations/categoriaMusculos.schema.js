import joi from "joi";

export const crearCategoriaMusculoSchema = joi.object({
    nombre: joi.string().required(),
});