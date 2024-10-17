"use client";

import useLogOut from "@/app/hooks/logOut";
import React from "react";
import Loader from "../../loader/Loader";

/*
  Este es el componente AsideButtons, que se encarga de mostrar un botón en un panel lateral.
  El componente utiliza el hook useLogOut para manejar el cierre de sesión y maneja su propio estado para controlar la carga del botón.
  Se proporcionan funciones para manejar el cambio de color del botón (onColor) y el clic en el botón (handleClick).
  El componente retorna un botón con un icono y texto, y puede cambiar su apariencia y comportamiento dependiendo de las props que reciba.
  Por ejemplo, si el texto del botón es "Cerrar Sesión", al hacer clic en el botón se ejecutará la función logOut para cerrar la sesión del usuario.
*/

interface AsideButtonsProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Icono del botón
  text?: string; // Texto del botón
  isActive?: boolean; // Estado del botón
  onclick?: () => void; // Función para manejar el click del botón
  color?: string; // Color del botón
  handleColor?: (value: string) => void; // Función para manejar el color del botón
}

const AsideButtons = ({
  Icon,
  text,
  isActive,
  onclick,
  color,
  handleColor,
}: AsideButtonsProps) => {
  const logOut = useLogOut(); // Hook para cerrar sesión
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  // Función para manejar el cambio de color del botón
  const onColor = () => {
    if (text) {
      handleColor?.(text);
    }
  };

  // Función para manejar el click del botón
  const handleClick = () => {
    if (text === "cacaoApi") {
      onclick?.(); // si el texto es "cacaoApi" se ejecuta la función onclick
    } else if (text === "Cerrar Sesión") {
      logOut(); // si el texto es "Cerrar Sesión" se ejecuta la función logOut
      setIsLoaded(true);
    } else {
      onColor?.(); // si el texto no es "Cerrar Sesión" se ejecuta la función onColor
    }
  };

  return (
    <button
      className={`w-full h-8 ${
        isActive ? "pl-7 transition-all duration-200" : "pl-0"
      }`}
      onClick={handleClick}
    >
      <div
        className={`w-full  flex ${
          !isActive
            ? "justify-center transition-all duration-200"
            : "justify-start"
        } items-center gap-3`}
      >
        <Icon
          className={`w-5  ${
            color === text ? "text-custom-blue" : "text-gray-500"
          }`}
        />
        {isActive && text !== "cocoaApi" && (
          <p
            className={` ${
              color === text ? "text-custom-blue" : "text-gray-500"
            } capitalize`}
          >
            {text}
          </p>
        )}
        {isActive && text === "cocoaApi" && (
          <h1 className="text-gray-500 ">{text}</h1>
        )}
      </div>
      {isLoaded && <Loader />}
    </button>
  );
};
export default AsideButtons;
