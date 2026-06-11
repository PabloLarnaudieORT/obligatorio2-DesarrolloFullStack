import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  obtenerMiPerfil,
  actualizarMiPerfil,
  subirImagenPerfil,
} from "../../../features/userLogic/usuarioAction";

const PerfilForm = () => {

  const [mensajeExito, setMensajeExito] =
    useState("");

  const [mensajeError, setMensajeError] =
    useState("");

  const {
    register,
    reset,
    handleSubmit,
  } = useForm();

  const [fotoPerfil, setFotoPerfil] =
    useState("");

  useEffect(() => {
    const cargarPerfil = async () => {
      const resultado =
        await obtenerMiPerfil();

      if (resultado.success) {
        reset({
          username:
            resultado.usuario.username,

          edad:
            resultado.usuario.edad,

          altura:
            resultado.usuario.altura,

          peso:
            resultado.usuario.peso,

          plan:
            resultado.usuario.plan,

          rol:
            resultado.usuario.rol,
        });

        setFotoPerfil(
          resultado.usuario.fotoPerfil || ""
        );

       
      }
    };

    cargarPerfil();
  }, [reset]);

 const manejarImagen = async (e) => {

  const archivo =
    e.target.files[0];

  if (!archivo) return;

  const resultado =
    await subirImagenPerfil(
      archivo
    );

  if (resultado.success) {

    setFotoPerfil(
      resultado.url
    );

  } else {

    setMensajeError(
      resultado.error
    );

  }

};

  const onSubmit = async (data) => {

  setMensajeExito("");
  setMensajeError("");

  const resultado =
    await actualizarMiPerfil({
      edad: data.edad,
      altura: data.altura,
      peso: data.peso,
      fotoPerfil,
    });

  if (resultado.success) {

    setMensajeExito(
      "Perfil actualizado correctamente"
    );

  } else {

    setMensajeError(
      resultado.error
    );

  }

};

  return (
    <>
      {fotoPerfil && (
        <div className="text-center mb-3">
          <img
            src={fotoPerfil}
            alt="Perfil"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      <div
        className="tarjeta w-100"
        style={{ maxWidth: 800 }}
      >
        <div className="col-12 mb-4">
          <label className="form-label">
            Foto de Perfil
          </label>

          <input
            type="file"
            className="form-control campo"
            accept="image/*"
            onChange={manejarImagen}
          />
        </div>

        <form
          className="row g-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-md-6">
            <label className="form-label">
              Usuario
            </label>

            <input
              className="form-control campo"
              readOnly
              {...register("username")}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Edad
            </label>

            <input
              type="number"
              className="form-control campo"
              {...register("edad")}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Altura
            </label>

            <input
              type="number"
              className="form-control campo"
              {...register("altura")}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Peso
            </label>

            <input
              type="number"
              className="form-control campo"
              {...register("peso")}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Plan
            </label>

            <input
              className="form-control campo"
              readOnly
              {...register("plan")}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Rol
            </label>

            <input
              className="form-control campo"
              readOnly
              {...register("rol")}
            />
          </div>

          <div className="col-12 mt-4">
            <button
              type="submit"
              className="btn btn-principal"
            >
              Actualizar Perfil
            </button>
          </div>
          {mensajeError && (
  <div className="col-12">
    <p className="text-danger mt-2">
      {mensajeError}
    </p>
  </div>
)}

{mensajeExito && (
  <div className="col-12">
    <p className="text-success mt-2">
      {mensajeExito}
    </p>
  </div>
)}
        </form>
      </div>
    </>
  );
};

export default PerfilForm;