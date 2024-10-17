"use client";

import { useEffect } from "react";

// Este componente se utiliza para redirigir a los usuarios desde la página de inicio a la página de inicio de sesión

export default function HomePage() {
  useEffect(() => {
    window.location.href = "/iniciar-sesion";
  }, []);

  return null;
}
