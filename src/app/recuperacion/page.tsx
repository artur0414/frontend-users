"use client";

import { useState } from "react";
import Loader from "../components/loader/Loader";

// Página de recuperación de contraseña. Este componente no se reutiliza en otros lugares, por lo que se mantiene como una página en lugar de un componente reutilizable.

// La solicitud fetch se realiza directamente en el controlador de envío del formulario y no en un useEffect porque solo necesitamos hacer la solicitud cuando el usuario envía el formulario.

const forgotPasswordPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://backend-users-8r0y.onrender.com/forgot",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      setUsername("");
      setEmail("");
      setError("");

      window.location.href = "/codigo";
    } catch (error) {
      setError("");
      setLoading(false);
      setError((error as Error).message);
    }
  };

  return (
    <>
      <form
        action=""
        className="flex flex-col justify-center items-start gap-6 md:gap-10 md:mt-2"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl px-2">Recuperar Contraseña</h3>
        <input
          className="w-full h-auto border px-5 py-2 rounded-lg text-sm md:py-3 md:text-base"
          name="username"
          type="text"
          placeholder="Nombre de usuario"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="w-full h-auto border px-5 py-2 rounded-lg text-sm md:py-3 md:text-base"
          name="email"
          type="email"
          placeholder="Correo Electrónico"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="w-full flex flex-col justify-center items-center gap-5 mt-8">
          <button
            className="w-full h-auto bg-custom-blue rounded-full text-white py-2 md:py-3 md:text-lg"
            type="submit"
          >
            Envíar
          </button>
          <button
            className="w-full h-auto border rounded-full py-2 md:py-3 md:text-lg"
            type="button"
            onClick={() => (window.location.href = "/iniciar-sesion")}
          >
            Regresar
          </button>
          {error && (
            <p className="mt-4 px-2 text-red-400 text-xs md:mt-6">{error}</p>
          )}
        </div>
      </form>
      {loading && <Loader />}
    </>
  );
};

export default forgotPasswordPage;
