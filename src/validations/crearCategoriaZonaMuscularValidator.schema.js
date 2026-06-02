import joi from "joi";

export const crearCategoriaZonaMuscularSchema = joi.object({
    nombreCategoriaZona: joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": "El nombre de la categoría debe ser un texto.",
            "string.empty": "El nombre de la categoría es obligatorio.",
            "string.min": "El nombre de la categoría debe tener al menos 3 caracteres.",
            "string.max": "El nombre de la categoría no puede exceder los 50 caracteres.",
            "any.required": "El nombre de la categoría es obligatorio."
        })
});