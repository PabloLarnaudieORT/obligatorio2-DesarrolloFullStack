import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { loginUsuario } from "../../../features/authLogic/authAction";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.authStore
  );

  const {
    register,
    handleSubmit,
    formState: {
      isValid
    },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {

  const resultado = await dispatch(
    loginUsuario(data)
  );

  if (resultado) {

    if (resultado.rol === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

  }
};

  return (
    <div className="formulario-zona">
      <div className="tarjeta">
        <h2 className="subtitulo">
          Bienvenido/a
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <label className="form-label">
              Usuario
            </label>

            <input
              type="text"
              className="form-control campo"
              placeholder="Tu usuario"
              {...register("username", {
                required: true,
              })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Contraseña
            </label>

            <input
              type="password"
              className="form-control campo"
              placeholder="··············"
              {...register("password", {
                required: true,
              })}
            />
          </div>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-principal w-100 mb-3"
            disabled={!isValid || loading}
          >
            {loading
              ? "Ingresando..."
              : "Iniciar Sesión"}
          </button>

          <Link
            to="/register"
            className="btn-secundario d-block text-center"
          >
            Registrarse
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;