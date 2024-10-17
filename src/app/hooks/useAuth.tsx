"use client";

/**
 * Hook personalizado para verificar la autenticación del usuario.
 * Realiza una solicitud GET al backend para verificar la autenticación, y si la solicitud es exitosa, establece el estado de autenticación como verdadero.
 * Si la solicitud falla, redirige al usuario a la página "/no-autorizado" y establece el estado de autenticación como falso.
 */

import { useEffect, useState } from "react";

interface AuthStatusProps {
  status: boolean;
  data?: { [key: string]: string }; // El objeto de datos es un mapa de pares clave-valor. Donde las claves y valores son cadenas de texto.
}

const useAuth = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatusProps>({
    status: false,
  });

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(
          "https://backend-users-8r0y.onrender.com/protected",
          {
            method: "GET",
            credentials: "include",
            mode: "cors",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          window.location.href = "/no-autorizado";
        }
        setAuthStatus({ status: true, data: data });
      } catch (error) {
        setAuthStatus({
          status: false,
        });
      }
    };
    verify();
  }, []);

  return authStatus;
};

export default useAuth;
