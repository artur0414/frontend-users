"use client";

import UpdatePassword from "@/app/components/updatePassword/updatePassword";
import useAuth from "@/app/hooks/useAuth";
import { useState } from "react";

/*
  Este es el componente OptionsPage, que se encarga de mostrar la página de ajustes del usuario.
  El componente utiliza el hook useAuth para obtener el estado de autenticación del usuario y mostrar su nombre y nombre de usuario.
  También maneja su propio estado para controlar la visualización del modal de actualización de contraseña.
  Se proporciona una función para cerrar el modal (onCloseModal).
  Al hacer clic en el botón "Actualizar Contraseña", se abre el modal de actualización de contraseña.
  El componente retorna una página con la información del usuario y un botón para abrir el modal de actualización de contraseña.
  Si el estado updatePassword es verdadero, se renderiza el componente UpdatePassword.
*/

export default function OptionsPage() {
  const authStatus = useAuth(); // Hook para obtener el estado de autenticación del usuario

  const [updatePassword, setUpdatePassword] = useState<boolean>(false); // Variable para mostrar modal de cambio de contraseña

  // Función para manejar el cierre del modal
  const onCloseModal = (value: boolean) => {
    setUpdatePassword(value);
  };

  return (
    <>
      <div className="mx-auto mt-24 max-w-xl w-full px-4 pl-20 py-0">
        <h2 className="mb-6 text-2xl md:text-3xl">Ajustes</h2>
        <div className="w-full max-h-[60vh] bg-white flex flex-col gap-8 py-8 px-4 overflow-y-auto">
          <div className="flex flex-col gap-3">
            <h4>Nombre</h4>
            {authStatus.data && (
              <p className="text-gray-500 text-sm">{authStatus.data.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h4>Nombre de Usuario</h4>
            {authStatus.data && (
              <p className="text-gray-500 text-sm">
                {authStatus.data.username}
              </p>
            )}
          </div>
          {/* boton para actualizar contraseña */}
          <div>
            <button
              onClick={() => setUpdatePassword((prev) => !prev)}
              className="bg-primary-500 text-custom-blue text-sm font-semibold"
            >
              Actualizar Contraseña
            </button>
          </div>
        </div>
        {updatePassword && <UpdatePassword onCloseModal={onCloseModal} />}
      </div>
    </>
  );
}
