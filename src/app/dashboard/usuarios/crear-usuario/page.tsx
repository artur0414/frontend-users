"use client";

import Loader from "@/app/components/loader/Loader";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";

/*
  Este es el componente AddUsers, que se encarga de la creación de nuevos usuarios.
  El componente maneja su propio estado para cada campo del formulario (nombre, correo electrónico, nombre de usuario, contraseña, confirmación de contraseña, rol) y también para el manejo de errores, carga y confirmación de creación de usuario.
  Se proporcionan funciones para manejar el envío del formulario (handleSubmit), el botón de regresar (handleBack) y el botón de crear usuario (handleAddUser).
  Al enviar el formulario, se realiza una solicitud POST al endpoint de registro con los datos del formulario. Si la solicitud es exitosa, se muestra un mensaje de éxito y se limpian los campos del formulario.
  Si ocurre un error durante la solicitud, se muestra un mensaje de error.
  El componente retorna un formulario para ingresar los datos del nuevo usuario y botones para crear el usuario y regresar.
*/

export default function AddUsers() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("admin");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [created, setCreated] = useState<boolean>(false); // Variable para mostrar mensaje de usuario creado

  // Función para manejar el botón de regresar
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = "/dashboard/usuarios";
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setLoading(false);
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(
        "https://backend-users-8r0y.onrender.com/register",
        {
          method: "POST",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            username: username,
            password: password,
            role: role,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      setCreated(true);
      setLoading(false);
      setError("");
    } catch (error) {
      setLoading(false);
      setError((error as Error).message);
    }
  };

  // Función para manejar el botón de crear usuario

  const handleAddUser = () => {
    if (created) {
      setCreated(false);
      window.location.href = "/dashboard/usuarios/crear-usuario";
    }
  };

  return (
    <div
      className={`mx-auto mt-24 max-w-xl w-full flex flex-col items-start pr-4 pl-20 py-0`}
    >
      <h2 className="mb-6 text-2xl md:text-3xl">Usuarios</h2>
      <form
        onSubmit={handleSubmit}
        className={` w-full flex flex-col items-start  bg-white gap-6 px-4 py-10 rounded-lg shadow-md overflow-y-auto max-h-[80vh] ${
          created ? "justify-between h-[60vh]" : "justify-start"
        }`}
      >
        <div className={`${created ? "hidden" : "flex flex-col gap-2 "}`}>
          <h3 className="text-sm font-semibold">Ingresar Datos del Usuario</h3>
          <p className="text-xs">Por favor ingresa los datos del usuario</p>
        </div>
        {created ? (
          <h3 className="text-custom-blue">¡Usuario Creado Con éxito!</h3>
        ) : (
          <>
            <input
              className="w-full h-12 border rounded-lg px-3 text-xs md:text-sm"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full h-12 border rounded-lg px-3 text-xs md:text-sm"
              type="text"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="w-full h-12 border rounded-lg px-3 text-xs md:text-sm"
              type="text"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="w-full h-12 border rounded-lg  text-xs md:text-sm flex justify-between items-center relative">
              <label className="w-full h-full relative flex items-center px-4">
                <select
                  className="appearance-none w-full h-full pr-6 focus:outline-none bg-transparent"
                  name="select-role"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option style={{ padding: "10px" }} value="admin">
                    Admin
                  </option>
                  <option style={{ padding: "10px" }} value="user">
                    User
                  </option>
                </select>
                <ChevronDownIcon className="h-4 w-4 absolute right-0 mr-2 pointer-events-none" />
              </label>
            </div>
            <label className="text-[12px] px-2 text-gray-400">
              La contraseña debe contener al menos 8 caracteres, una letra
              mayúscula, una letra minúscula, un número y un carácter especial(@
              $ ! % * ? &).
            </label>
            <input
              className="w-full h-12 border rounded-lg px-3 text-xs md:text-sm"
              type="password"
              placeholder="Contraseña"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Debe contener al menos un número, una letra minúscula, una letra mayúscula y un carácter especial."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="w-full h-12 border rounded-lg px-3 text-xs md:text-sm"
              type="password"
              placeholder="Repetir Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
        <div className="flex flex-col md:flex-row justify-center gap-4 w-full mt-4">
          <button
            onClick={handleAddUser}
            className="text-xs flex justify-center items-center w-full md:w-28 h-10 text-white bg-custom-blue rounded-md"
          >
            Crear Usuario
          </button>
          <button
            onClick={handleBack}
            className="text-xs flex justify-center items-center w-full md:w-28 h-10 bg-white border rounded-md"
          >
            Regresar
          </button>
        </div>
        {error && (
          <p className="text-xs text-red-500 text-center w-full">{error}</p>
        )}
      </form>
      {loading && <Loader />}
    </div>
  );
}
