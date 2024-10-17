"use client";

import { useEffect, useState } from "react";

/**
 * Hook personalizado para obtener usuarios desde el backend.
 * Devuelve un objeto con el estado de la solicitud, los datos (si la solicitud fue exitosa), y un mensaje de error (si la solicitud falló).
 */

const useGetUsers = () => {
  interface GetUsersProps {
    status: boolean;
    data?: { [key: string]: string }; // El objeto de datos es un mapa de pares clave-valor. Donde las claves y valores son cadenas de texto.
    error?: string;
  }
  const [userResponse, setUserResponse] = useState<GetUsersProps>({
    status: false,
  });

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(
          "https://backend-users-8r0y.onrender.com/getall",
          {
            method: "GET",
            credentials: "include",
            mode: "cors",
          }
        );
        const data = await response.json();

        if (!response.ok) {
          setUserResponse({
            status: false,
            error: data.error || "Error al obtener los usuarios",
          });
          window.location.href = "/no-autorizado";
          throw new Error(data.error || "Error al obtener los usuarios");
        }

        setUserResponse({ status: true, data: data });
        return data;
      } catch (error) {
        setUserResponse({
          status: false,
          error: (error as Error).message || "Error al obtener los usuarios",
        });
      }
    };
    verify();
  }, []);

  return userResponse;
};

export default useGetUsers;
