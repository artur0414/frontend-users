"use client";

import { useState } from "react";
import Loader from "../components/loader/Loader";

// Página de verificación del código de recuperación de contraseña. Este componente no se reutiliza en otros lugares, por lo que se mantiene como una página en lugar de un componente reutilizable.
// La solicitud fetch se realiza directamente en el controlador de envío del formulario y no en un useEffect porque solo necesitamos hacer la solicitud cuando el usuario envía el formulario.

const codePage = () => {
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://backend-users-8r0y.onrender.com/recover",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      setCode("");
      setError("");

      window.location.href = "/restablecer-contrasena";
    } catch (error) {
      setLoading(false);
      setError("");
      setError((error as Error).message);
    }
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
        <input
          className="w-full h-auto border px-5 py-2 rounded-lg text-sm md:h-14 md:py-3"
          name="codigo"
          type="text"
          placeholder="Código de verificación"
          onChange={(e) => setCode(e.target.value)}
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
            onClick={() => (window.location.href = "/recuperacion")}
          >
            Regresar
          </button>
          {error && (
            <p className="mt-4 px-2 text-red-400 text-xs md:mt-6">{error}</p>
          )}
        </div>
      </form>
      <button
        onClick={() => (window.location.href = "/recuperacion")}
        className="text-blue-400"
      >
        ¿Enviar código de nuevo?
      </button>
      {loading && <Loader />}
    </>
  );
};

export default codePage;
