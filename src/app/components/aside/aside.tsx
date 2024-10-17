"use client";

import {
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
  Square3Stack3DIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import AsideButtons from "../buttons/aside-buttons/button";
import useAuth from "../../hooks/useAuth";

/*
  Este es el componente Aside, que representa un panel lateral en la aplicación.
  El panel contiene varios botones que se crean utilizando el componente AsideButtons.
  El panel puede cambiar su ancho dependiendo del estado isActiveMenu, que se controla con la función handleMenu.
  El color del panel se guarda en el estado color y se puede cambiar con la función handleColor. El color también se guarda en el almacenamiento local.
  Si el usuario es un administrador, se mostrará un botón adicional, que redirige a la página de usuarios.
*/

interface AsideProps {
  handleNavigation: (text: string) => void;
}

const Aside = ({ handleNavigation }: AsideProps) => {
  const authInfo = useAuth(); // Hook para obtener la información de autenticación del usuario
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false); // Estado del menú lateral
  const [color, setColor] = useState<string>("dashboard"); // Estado del color del menú
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Estado para verificar si el usuario es administrador

  // Función para manejar el cambio de tamaño de la ventana
  const handleResize = () => {
    const isDesktopView = window.innerWidth >= 1024;
    setIsActiveMenu(isDesktopView);
  };

  //Hook para manejar el cambio de color del menú
  useEffect(() => {
    const savedColor = localStorage.getItem("color"); // Obtener el color guardado en el localStorage
    if (savedColor) {
      setColor(savedColor); // Si hay un color guardado, establecerlo como color actual
    }
  }, []);

  //Hook para verificar si el usuario es administrador se renderiza el componente cada vez que cambia la información de autenticación
  useEffect(() => {
    if (authInfo.data && authInfo.data.role === "admin") {
      setIsAdmin(true);
    }
  }, [authInfo]);

  //Hook para manejar el cambio de tamaño
  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Función para manejar el menú lateral

  const handleMenu = () => {
    setIsActiveMenu((prev) => !prev);
  };

  // Función para manejar el cambio de color del menú

  const handleColor = (value: string) => {
    setColor(value);
    handleNavigation(value);
    localStorage.setItem("color", value); // Guardar el color en el localStorage
  };

  return (
    <div
      className={`py-5 h-screen bg-white flex flex-col items-center ${
        isActiveMenu ? "w-60" : "w-16"
      } transition-all duration-300 absolute z-10 md:relative md:z-auto`}
    >
      <AsideButtons
        Icon={Bars3Icon}
        onclick={handleMenu}
        text="cacaoApi"
        isActive={isActiveMenu}
      />
      <div className="w-full flex-grow flex flex-col gap-6 items-center mt-12">
        <AsideButtons
          Icon={HomeIcon}
          text="dashboard"
          isActive={isActiveMenu}
          color={color}
          handleColor={handleColor}
        />
        <AsideButtons
          Icon={UserIcon}
          text="perfil"
          isActive={isActiveMenu}
          color={color}
          handleColor={handleColor}
        />
        <AsideButtons
          Icon={Square3Stack3DIcon}
          text="datos"
          isActive={isActiveMenu}
          color={color}
          handleColor={handleColor}
        />
        {isAdmin && (
          <AsideButtons
            Icon={UsersIcon}
            text="usuarios"
            isActive={isActiveMenu}
            color={color}
            handleColor={handleColor}
          />
        )}
      </div>

      <div className="w-full flex justify-center mb-10 flex-col items-center gap-6">
        <AsideButtons
          Icon={Cog6ToothIcon}
          text="ajustes"
          isActive={isActiveMenu}
          color={color}
          handleColor={handleColor}
        />
        <AsideButtons
          Icon={ArrowRightEndOnRectangleIcon}
          text="Cerrar Sesión"
          isActive={isActiveMenu}
        />
      </div>
    </div>
  );
};

export default Aside;
