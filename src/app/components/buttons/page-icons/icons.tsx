"use client";

import useLogOut from "@/app/hooks/logOut";
import React from "react";
import Loader from "../../loader/Loader";

// Componente IconsButtons. Este componente muestra un botón con un icono y un texto opcional.
// Utiliza el hook personalizado useLogOut para manejar el cierre de sesión, y el hook useState de React para manejar el estado de carga.
// El controlador de eventos handleClick realiza diferentes acciones dependiendo del valor de text.

interface iconsButtonsProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text?: string;
}

const IconsButtons = ({ Icon, text }: iconsButtonsProps) => {
  const logOut = useLogOut();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  //cambiar color del texto e iconos

  const handleClick = () => {
    if (text === "cerrar sesión") {
      logOut(); // Llama a logOut para cerrar sesión
      setIsLoaded(true);
    }

    if (text === "agregar usuario") {
      window.location.href = "/dashboard/usuarios/crear-usuario";
    }
  };

  return (
    <>
      <button onClick={handleClick}>
        <Icon className="w-6 h-6 text-gray-400" />
      </button>
      {isLoaded && <Loader />}
    </>
  );
};
export default IconsButtons;
