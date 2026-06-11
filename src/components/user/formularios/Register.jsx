import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { registrarUsuario } from "../../../features/authLogic/registerAction";
import { loginSuccess } from "../../../features/authLogic/authSlice";

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mensajeError, setMensajeError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isValid,
      isSubmitting,
    },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const onSubmit = async (data) => {

    setMensajeError("");

    const datosRegistro = {
      ...data,
      rol: "user",
    };

    const resultado =
      await registrarUsuario(datosRegistro);

    if (resultado.success) {

      const token =
        resultado.data.token;

      const decoded =
        jwtDecode(token);

      dispatch(
        loginSuccess({
          token,
          id: decoded.id,
          rol: decoded.rol,
          usuario: data.username,
        })
      );

      localStorage.setItem(
        "token",
        token
      );
      

      localStorage.setItem(
        "rol",
        decoded.rol
      );

      localStorage.setItem(
        "user",
        data.username
      );

      navigate("/dashboard");

    } else {

      setMensajeError(resultado.error);

    }

  };

  return (
    <div className="formulario-zona">
      <div className="tarjeta">

        <h2 className="mb-4">
          Crear cuenta
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
        >

          {/* Usuario */}

          <div className="mb-3">
            <label className="form-label">
              Usuario
            </label>

            <input
              type="text"
              className="form-control campo"
              placeholder="Elegí tu nombre"
              {...register("username", {
                required: "Usuario obligatorio",
                minLength: {
                  value: 3,
                  message:
                    "Mínimo 3 caracteres",
                },
              })}
            />

            {errors.username && (
              <small className="text-danger">
                {errors.username.message}
              </small>
            )}
          </div>

          {/* Edad */}

          <div className="mb-3">
            <label className="form-label">
              Edad
            </label>

            <input
              type="number"
              className="form-control campo"
              {...register("edad")}
            />
          </div>

          {/* Altura */}

          <div className="mb-3">
            <label className="form-label">
              Altura (cm)
            </label>

            <input
              type="number"
              className="form-control campo"
              {...register("altura")}
            />
          </div>

          {/* Peso */}

          <div className="mb-3">
            <label className="form-label">
              Peso (kg)
            </label>

            <input
              type="number"
              className="form-control campo"
              {...register("peso")}
            />
          </div>

          {/* Password */}

          <div className="mb-3">
            <label className="form-label">
              Contraseña
            </label>

            <input
              type="password"
              className="form-control campo"
              placeholder="••••••••"
              {...register("password", {
                required:
                  "Contraseña obligatoria",
                minLength: {
                  value: 6,
                  message:
                    "Mínimo 6 caracteres",
                },
              })}
            />

            {errors.password && (
              <small className="text-danger">
                {errors.password.message}
              </small>
            )}
          </div>

          {/* Confirm Password */}

          <div className="mb-4">
            <label className="form-label">
              Repetir Contraseña
            </label>

            <input
              type="password"
              className="form-control campo"
              placeholder="••••••••"
              {...register(
                "confirmPassword",
                {
                  required:
                    "Confirmá la contraseña",
                  validate: (value) =>
                    value === password ||
                    "Las contraseñas no coinciden",
                }
              )}
            />

            {errors.confirmPassword && (
              <small className="text-danger">
                {
                  errors.confirmPassword
                    .message
                }
              </small>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-principal w-100 mb-3"
            disabled={
              !isValid ||
              isSubmitting
            }
          >
            {isSubmitting
              ? "Registrando..."
              : "Completar Registro"}
          </button>

          <Link
            to="/"
            className="btn-secundario d-block text-center"
          >
            Volver al inicio
          </Link>

        </form>
      </div>
    </div>
  );
};

export default Register;