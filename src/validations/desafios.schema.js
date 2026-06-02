import Joi from "joi";

export const editarDesafiosSchema = Joi.object({
  nombreDesafio: Joi.string().min(2).max(100).optional().messages({
    "string.empty": "El nombre del desafío es obligatorio",
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede superar los 100 caracteres",
  }),
  fechaLimite: Joi.date().optional().messages({
    "date.base": "La fecha límite debe ser una fecha válida",
  }),
  puntosDesafio: Joi.number().min(0).max(10000).optional().messages({
    "number.base": "Los puntos deben ser un número",
    "number.min": "Los puntos no pueden ser menores a 0",
    "number.max": "Los puntos no pueden superar 10000",
  }),
  categoriaZonaMuscular: Joi.string().optional().messages({
    "string.empty": "Debés seleccionar una categoría",
  }),
});

export const crearDesafiosSchema = Joi.object({
  nombreDesafio: Joi.string().min(2).max(100).required().messages({
    "string.empty": "El nombre del desafío es obligatorio",
    "string.min": "El nombre debe tener al menos 2 caracteres",
    "string.max": "El nombre no puede superar los 100 caracteres",
    "any.required": "El nombre del desafío es obligatorio",
  }),

  fechaLimite: Joi.date().required().messages({
    "date.base": "La fecha límite debe ser una fecha válida",
    "any.required": "La fecha límite es obligatoria",
  }),

  puntosDesafio: Joi.number().min(0).max(10000).required().messages({
    "number.base": "Los puntos deben ser un número",
    "number.min": "Los puntos no pueden ser menores a 0",
    "number.max": "Los puntos no pueden superar 10000",
    "any.required": "Los puntos son obligatorios",
  }),

  categoriaZonaMuscular: Joi.string().required().messages({
    "string.empty": "Debés seleccionar una categoría",
    "any.required": "Debés seleccionar una categoría",
  }),
});