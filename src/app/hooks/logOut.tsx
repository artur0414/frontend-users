"use client";

/**
 * Hook personalizado para cerrar la sesión del usuario.
 * Realiza una solicitud POST al backend para cerrar la sesión, y si la solicitud es exitosa, redirige al usuario a la página de inicio y elimina un elemento almacenado en  cokies.
 * Si la solicitud falla, lanza un error con el mensaje de error de la respuesta.
 */

const useLogOut = () => {
  const logOut = async () => {
    try {
      const result = await fetch(
        "https://backend-users-8r0y.onrender.com/logout",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
        }
      );

      const data = await result.json();

      if (!result.ok) {
        throw new Error(data.error || "Error cerrando sesión");
      }
      window.location.href = "/";
      localStorage.removeItem("color");
    } catch (error) {
      console.error(error);
    }
  };

  return logOut;
};

export default useLogOut;
