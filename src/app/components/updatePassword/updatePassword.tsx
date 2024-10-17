"use client";

import { useState } from "react";

/*
  Este es el componente UpdateCurrentPassword, que se encarga de la actualización de la contraseña del usuario actual.
  El componente maneja su propio estado para cada campo del formulario (contraseña antigua, nueva contraseña, confirmación de contraseña) y también para el manejo de errores y la confirmación de cambio de contraseña.
  Se proporcionan funciones para manejar la actualización de la contraseña (handleUpdate) y el cierre del modal (onClose).
  Al enviar el formulario, se realiza una solicitud PATCH al endpoint de actualización de contraseña con los datos del formulario. Si la solicitud es exitosa, se muestra un mensaje de éxito y se limpian los campos del formulario.
  Si ocurre un error durante la solicitud, se muestra un mensaje de error.
  El componente retorna un modal con un formulario para ingresar las contraseñas y botones para actualizar la contraseña y cerrar el modal.
*/

interface UpdateCurrentPasswordProps {
  onCloseModal: (value: boolean) => void; //función para cerrar el modal
}

const UpdateCurrentPassword = ({
  onCloseModal,
}: UpdateCurrentPasswordProps) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [changed, setChanged] = useState<boolean>(false); // Variable para mostrar mensaje de contraseña actualizada

  //función para actualizar contraseña
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch(
        "https://backend-users-8r0y.onrender.com/update-password",
        {
          method: "PATCH",
          credentials: "include",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: oldPassword,
            newPassword: newPassword,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      setChanged(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  // Función para manejar el cierre del modal

  const onClose = () => {
    onCloseModal(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError;
    setChanged(false);
  };

  return (
    <>
      <div className=" fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
        <div className=" bg-white rounded-lg p-6 w-[95%] max-w-md flex flex-col gap-4">
          {!changed ? (
            <>
              <h3 className="text-2xl mb-4">Actualizar Contraseña</h3>
              <form onSubmit={handleUpdate} className="flex flex-col gap-6">
                <input
                  className="w-full h-14 border px-4 rounded-lg text-sm "
                  type="password"
                  placeholder="Contraseña Anterior"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <label className="text-[12px] px-2 text-gray-400">
                  La contraseña debe contener al menos 8 caracteres, una letra
                  mayúscula, una letra minúscula, un número y un carácter
                  especial(@ $ ! % * ? &).
                </label>
                <input
                  className="w-full h-14 border px-4 rounded-lg text-sm "
                  type="password"
                  placeholder="Nueva Contraseña"
                  value={newPassword}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="Debe contener al menos un número, una letra minúscula, una letra mayúscula y un carácter especial."
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <input
                  className="w-full h-14 border px-4 rounded-lg text-sm "
                  type="password"
                  placeholder="Repetir Contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {error && <p className="ml-2 text-red-500 text-sm">{error}</p>}
                <div className="flex justify-between my-6 gap-4 ">
                  <button
                    type="button"
                    className="w-full h-10 border rounded-lg text-black text-sm"
                    onClick={onClose}
                  >
                    Regresar
                  </button>
                  <button
                    type="submit"
                    className="w-full h-10 bg-custom-blue rounded-lg text-white text-sm"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col gap-16 py-4 items-center">
              <h4 className="text-lg mb-4">¡Contraseña Actualizada!</h4>
              <button
                onClick={onClose}
                className="w-[50%] h-10 bg-custom-blue rounded-lg text-white text-sm"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateCurrentPassword;
