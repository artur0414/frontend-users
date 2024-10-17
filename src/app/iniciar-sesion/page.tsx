"use client";

import { useEffect, useState } from "react";
import Login from "../components/login/Login";
import Loader from "../components/loader/Loader";

// Componente de la página de inicio de sesión
export default function SignInPage() {
  // Estado para controlar si la página ha cargado completamente
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Efecto para establecer isLoaded a true una vez que la página ha cargado completamente
  useEffect(() => {
    if (document.readyState === "complete") {
      setIsLoaded(true);
    } else {
      window.onload = () => {
        setIsLoaded(true);
      };
    }
  }, []);

  // Renderizado condicional: mostrar el Loader si la página aún no ha cargado, de lo contrario mostrar el componente Login
  return <>{!isLoaded ? <Loader /> : <Login />}</>;
}
