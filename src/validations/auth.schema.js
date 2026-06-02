import Joi from "joi";

export const registrarUsuarioSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30).required().messages({
        "string.base": "El nombre de usuario debe ser un texto",
        "string.empty": "El nombre de usuario no puede estar vacío",
        "string.min": "El nombre de usuario debe tener al menos {#limit} caracteres",
        "string.max": "El nombre de usuario no puede tener más de {#limit} caracteres"
    }),
    password: Joi.string().trim().min(6).max(128).required().messages({
        "string.base": "La contraseña debe ser un texto",
        "string.empty": "La contraseña no puede estar vacía",
        "string.min": "La contraseña debe tener al menos {#limit} caracteres",
        "string.max": "La contraseña no puede tener más de {#limit} caracteres"
    }),
    confirmPassword: Joi.string().trim().valid(Joi.ref('password')).required().messages({
        "any.only": "Las contraseñas no coinciden"
    }),
    rol: Joi.string().valid("user", "admin").required(),

    codigoAdmin: Joi.string().when('rol', {
        // Si el rol es admin, el código de administrador es obligatorio; si es user, no debe ser proporcionado
        is: 'admin',
        then: Joi.required(),
        //si el rol es user, el código de administrador no debe ser proporcionado
        otherwise:Joi.forbidden()
    }).messages({
        "any.required": "El código de administrador es obligatorio para el rol admin",
        "any.unknown": "El código de administrador no debe ser proporcionado para el rol user"
    }),
    edad: Joi.number().integer().positive().optional(),
    altura: Joi.number().integer().positive().optional().messages({
        "number.base": "La altura debe ser un número",
        "number.integer": "La altura debe ser un número entero",
        "number.positive": "La altura debe ser un número positivo"
    }),
    peso: Joi.number().integer().positive().optional().messages({
        "number.base": "El peso debe ser un número",
        "number.integer": "El peso debe ser un número entero",
        "number.positive": "El peso debe ser un número positivo"
    })
});

export const loginUsuarioSchema = Joi.object({
    username: Joi.string().trim().required().messages({
        "string.base": "El nombre de usuario debe ser un texto",
        "string.empty": "El nombre de usuario no puede estar vacío",
        "any.required": "El nombre de usuario es obligatorio"
    }),
    password: Joi.string().trim().required().messages({
        "string.base": "La contraseña debe ser un texto",
        "string.empty": "La contraseña no puede estar vacía",
        "any.required": "La contraseña es obligatoria"
    })
});