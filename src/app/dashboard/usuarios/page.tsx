"use client";

import IconsButtons from "@/app/components/buttons/page-icons/icons";
import useGetUsers from "@/app/hooks/getUsers";
import { EllipsisVerticalIcon, UserPlusIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useEffect, useRef, useState } from "react";

// Componente principal de la página de usuarios

/*
  Este componente se encarga de mostrar la lista de usuarios y proporcionar opciones para interactuar con cada usuario.
  Aunque se proporcionan funciones para manejar la eliminación y actualización de usuarios, no se crearon hooks para DELETE o PATCH(para cambiar el rol).
  Esto se debe a que estas operaciones no se realizan en otra sección de la aplicación.
*/

export default function UsersPage() {
  const [isModalActive, setIsModalActive] = useState<boolean>(false); // Estado para controlar la visibilidad del menú de opciones
  const [activeUser, setActiveUser] = useState<string>(""); // Estado para guardar el nombre del usuario activo
  const optionsRef = useRef<HTMLDivElement>(null); // Referencia al menú de opciones
  const authStatus = useGetUsers(); // Hook para obtener los datos de los usuarios y verificar el estado de la sesión
  const [isDesktop, setIsDesktop] = useState<boolean>(false); // Estado para verificar si la vista es de escritorio
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null); // Estado para confirmar la eliminación de un usuario
  const [error, setError] = useState<string>(""); // Estado para manejar errores

  // Función para manejar el redimensionamiento de la ventana
  const handleResize = () => {
    const isDesktopView = window.innerWidth >= 1024;
    setIsDesktop(isDesktopView);
  };

  // Hook de efecto para agregar y eliminar el evento de redimensionamiento de la ventana
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    // Limpiar el evento de redimensionamiento cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Hook de efecto para agregar y eliminar el evento de clic en el documento
  // Se utiliza para cerrar el menú de opciones cuando se hace clic fuera de él

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!optionsRef.current?.contains(event.target as Node)) {
        setIsModalActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    // Limpiar el evento de click fuera del menú de opciones cuando el componente se desmonta
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función ara manejar la apertura y cierre del menú de opciones

  const handleOptions = (text: string) => {
    setActiveUser(text);
    setIsModalActive((prev) => !prev);
  };

  // Función para  la eliminación de un usuario. Se activa cuando se hace clic en el botón de eliminar y muestra un mensaje de confirmación para eliminar al usuario

  const deleteUser = (id: string) => {
    setConfirmDelete(id);
  };

  // si se confirma la eliminación, se envía una solicitud DELETE al servidor para eliminar al usuario
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `https://backend-users-8r0y.onrender.com/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          mode: "cors",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al eliminar el usuario");
      }

      window.location.href = "/dashboard/usuarios";
    } catch (error) {
      setError((error as Error).message);
    }
  };

  // Función para cambiar el rol de un usuario. Se activa cuando se hace clic en el botón de cambiar rol

  const handleUpdate = async (username: string, role: string) => {
    try {
      const newRole = role === "admin" ? "user" : "admin";
      const response = await fetch(
        `https://backend-users-8r0y.onrender.com/update-role`,
        {
          method: "PATCH",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, role: newRole }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      window.location.href = "/dashboard/usuarios";
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <div className="mx-auto mt-24 max-w-screen-lg w-full px-4 pl-20 py-0">
      <h2 className="mb-6 text-2xl md:text-3xl">Usuarios</h2>
      <div className="w-full h-[60vh] lg:h-[60vh] bg-white overflow-y-auto shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white shadow-bottom">
              <th className="p-4 text-left text-gray-500 font-light">Nombre</th>
              {isDesktop && (
                <>
                  <th className="px-8 py-4 text-left text-gray-500 font-light">
                    Correo Electrónico
                  </th>
                  <th className="px-8 py-4 text-left text-gray-500 font-light">
                    Nombre de Usuario
                  </th>
                </>
              )}
              <th className="px-8 py-4 text-left text-gray-500 font-light">
                Rol
              </th>
            </tr>
          </thead>
          <tbody>
            {authStatus.data &&
              Array.isArray(authStatus.data) &&
              authStatus.data.map((user) => (
                <React.Fragment key={user.id}>
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="p-4 text-neutral-500 text-sm border-b border-gray-100">
                      {user.name}
                    </td>
                    {isDesktop && (
                      <>
                        <td className="px-8 py-4 text-neutral-400 text-sm border-b border-gray-100">
                          {user.email}
                        </td>
                        <td className="px-8 py-4 text-neutral-400 text-sm border-b border-gray-100">
                          {user.username}
                        </td>
                      </>
                    )}
                    <td
                      className={`px-8 py-4 text-sm  border-b border-gray-100 ${
                        user.role === "admin"
                          ? "text-custom-blue"
                          : "text-custom-yellow"
                      } flex items-center justify-between relative`}
                    >
                      {user.role}
                      {isModalActive && user.name === activeUser && (
                        <div
                          ref={optionsRef}
                          className="absolute right-0 top-0 mr-14 z-30 w-28 h-20 bg-white shadow-md p-2 flex flex-col items-start justify-center gap-2"
                        >
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-400"
                          >
                            Eliminar
                          </button>
                          <button
                            onClick={() =>
                              handleUpdate(user.username, user.role)
                            }
                            className="text-green-500"
                          >
                            Cambiar Rol
                          </button>
                        </div>
                      )}
                      <button onClick={() => handleOptions(user.name)}>
                        <EllipsisVerticalIcon className="w-5 h-5 text-gray-700" />
                      </button>
                    </td>
                  </tr>
                  {confirmDelete && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="bg-white w-96 h-52 rounded-lg flex flex-col items-center justify-around">
                        <p className="text-lg text-center text-gray-700">
                          ¿Estás seguro de querer eliminar este usuario?
                        </p>
                        <div className="flex items-center justify-around gap-5 mt-4">
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="bg-gray-200 px-6 py-2 rounded-lg"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => handleDelete(confirmDelete)}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                      {error && (
                        <div className="text-red-400 text-center text-lg">
                          <p> {error}</p>
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-56 bg-white h-16 flex items-center justify-evenly rounded-full absolute bottom-10 right-10">
        <p className="text-neutral-500">Agregar Usuario</p>
        <IconsButtons Icon={UserPlusIcon} text="agregar usuario" />
      </div>
    </div>
  );
}
