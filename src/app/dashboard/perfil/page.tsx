"use client";

import useAuth from "@/app/hooks/useAuth";

//Este componente envuelve el perfil, que muestra los datos generales de usuario, y utiliza el hook creado "useAuth" para obtener los datos de él, y verificar el estado de sesión

export default function UserPage() {
  const authStatus = useAuth();

  return (
    <>
      <div className="mx-auto mt-24 max-w-xl w-full px-4 pl-20 py-0">
        <h2 className="mb-6 text-2xl md:text-3xl">Perfil</h2>
        <div className="w-full max-h-[60vh] bg-white flex flex-col gap-8 py-8 px-4 overflow-y-auto">
          <div className="flex flex-col gap-3">
            <h4>Nombre</h4>
            {authStatus.data && (
              <p className="text-gray-500 text-sm">{authStatus.data.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <h4>Correo Electrónico</h4>
            {authStatus.data && (
              <p className="text-gray-500 text-sm">{authStatus.data.email}</p>
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
        </div>
      </div>
    </>
  );
}
