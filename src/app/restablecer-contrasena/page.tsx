"use client";

import React from "react";
import Loader from "../components/loader/Loader";

// Página de cambio de contraseña. Este componente no se reutiliza en otros lugares, por lo que se mantiene como una página en lugar de un componente reutilizable.
// La solicitud fetch se realiza directamente en el controlador de envío del formulario y no en un useEffect porque solo necesitamos hacer la solicitud cuando el usuario envía el formulario.

const forgotPasswordPage = () => {
  const [error, setError] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }
      const response = await fetch(
        "https://backend-users-8r0y.onrender.com/update",
        {
          method: "PATCH",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      setError("");
      setPassword("");

      setSuccess(true);

      setLoading(success);
    } catch (error) {
      setLoading(false);
      setError("");

      setTimeout(() => {
        setError((error as Error).message);
      }, 1000);
    }
  };

  const handleLogin = () => {
    window.location.href = "/iniciar-sesion";
  };

  return (
    <>
      <form
        action=""
        className="flex flex-col justify-center items-start gap-6 md:gap-5 md:mt-2"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-2xl px-2">Iniciar Sesión</h3>
          <p className="text-xs md:text-sm text-gray-500 px-2">
            Hemos enviado un código de verificación a tu correo electrónico, por
            favor ingrésalo a continuación:
          </p>
        </div>
        <label className="text-[12px] px-2 text-gray-400">
          La contraseña debe contener al menos 8 caracteres, una letra
          mayúscula, una letra minúscula, un número y un carácter especial(@ $ !
          % * ? &).
        </label>
        <input
          className="w-full h-auto border px-5 py-2 rounded-lg text-sm md:h-14 md:py-3"
          name="contraseña"
          type="password"
          placeholder="Nueva Contraseña"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          title="Debe contener al menos un número, una letra minúscula, una letra mayúscula y un carácter especial."
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="w-full h-auto border px-5 py-2 rounded-lg text-sm md:h-14 md:py-3"
          name="contra"
          type="password"
          placeholder="Repetir Contraseña"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="w-full flex flex-col justify-center items-center gap-5 mt-8">
          <button
            className="w-full h-auto bg-custom-blue rounded-full text-white py-2 md:py-3 md:text-lg"
            type="submit"
          >
            Siguiente
          </button>
          <button
            className="w-full h-auto border rounded-full py-2 md:py-3 md:text-lg"
            type="button"
            onClick={() => (window.location.href = "/codigo")}
          >
            Regresar
          </button>
          {error && (
            <p className="mt-4 px-2 text-red-400 text-xs md:mt-6">{error}</p>
          )}
        </div>
      </form>
      {loading && <Loader />}
      {success && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white shadow-lg w-[300px] flex flex-col justify-evenly items-center gap-10 h-[400px] md:w-[400px]">
            <p className="w-full text-center text-gray-800 text-lg">
              ¡Contraseña restablecida con éxito!
            </p>
            <button
              onClick={handleLogin}
              className="bg-custom-blue text-white py-3 px-6 rounded focus:outline-none text-base"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default forgotPasswordPage;
