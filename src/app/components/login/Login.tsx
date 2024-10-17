"use client";

import { useState } from "react";
import Loader from "../loader/Loader";

// Componente de inicio de sesión

const Login = () => {
  // Estado del componente

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Manejador de envío del formulario

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento de envío de formularios predeterminado
    setLoading(true); // Iniciar la carga
    try {
      // Realizar la solicitud de inicio de sesión
      const response = await fetch(
        "https://backend-users-8r0y.onrender.com/login",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      // Si la respuesta no es exitosa, lanzar un error

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      // Limpiar el estado después de un inicio de sesión exitoso

      setPassword("");
      setUsername("");
      setError("");

      window.location.href = "/dashboard";
    } catch (error) {
      setLoading(false);
      setError((error as Error).message);
    }
  };

  const handleForgot = () => {
    window.location.href = "/recuperacion";
    setLoading(true);
  };

  return (
    <>
      {/* Contenedor para el título y el subtítulo */}
      <div className="flex flex-col gap-2 w-full">
        <h3 className="text-2xl px-2">Iniciar Sesión</h3>
        <p className="text-xs md:text-sm text-gray-400 px-2">
          Inicia sesión para contribuir con nuestro cacaoAPI
        </p>
      </div>
      {/* Formulario de inicio de sesión */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-start gap-5 md:gap-7 md:mt-2"
      >
        {/* Campos */}

        <input
          className="w-full h-auto border px-4 py-2 rounded-lg text-sm md:py-3 md:text-base"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Nombre de usuario"
          required
        />
        <input
          className="w-full h-auto border px-4 py-2 rounded-lg text-sm md:py-3 md:text-base"
          name="contraseña"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Contraseña"
          required
        />

        {/* Botones */}
        <button type="button" onClick={handleForgot}>
          <p className="w-full text-xs px-2 h-full text-custom-blue md:text-sm">
            ¿Has olvidado tu contraseña?
          </p>
        </button>

        <div className="w-full">
          <button
            className="w-full h-auto bg-custom-blue rounded-full text-white py-2 md:py-3 md:text-lg"
            type="submit"
          >
            Iniciar Sesión
          </button>

          {/* Mensaje de error */}
          {error && (
            <p className="mt-4 px-2 text-red-400 text-xs md:mt-6">{error}</p>
          )}
        </div>
      </form>
      {loading && <Loader />}
    </>
  );
};

export default Login;
