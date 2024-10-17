"use client";

import useAuth from "@/app/hooks/useAuth";
import UsernameInfo from "../usernameInfo/usernameInfo";

// Componente Float. Este componente se muestra en el dashboard y muestra información del usuario actual, como su nombre de usuario.
// Utiliza el hook personalizado useAuth para obtener el estado de autenticación del usuario.

export default function Float() {
  const authStatus = useAuth();

  return (
    <>
      {authStatus.data && <UsernameInfo username={authStatus.data.username} />}
    </>
  );
}
