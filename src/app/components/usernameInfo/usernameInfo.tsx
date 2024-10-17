"use client";

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/16/solid";
import IconsButtons from "../buttons/page-icons/icons";

// Componente UsernameInfo. Este componente muestra el nombre de usuario del usuario actual y un botón para cerrar la sesión.
// Recibe el nombre de usuario como prop y lo muestra en un elemento h2.

interface UsernameInfoProps {
  username: string;
}

const UsernameInfo = ({ username }: UsernameInfoProps) => {
  return (
    <div className="bg-white w-60 flex justify-around items-center border absolute rounded-full h-12 right-5 top-5 md:right-10 md:top-10 lg:right-20 lg:top-10">
      <h2 className="text-gray-500">{username}</h2>
      <IconsButtons Icon={ArrowRightEndOnRectangleIcon} text="cerrar sesión" />
    </div>
  );
};

export default UsernameInfo;
