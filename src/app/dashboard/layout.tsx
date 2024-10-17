"use client";

import Aside from "../components/aside/aside";
import Float from "../components/float-button/float";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import Loader from "../components/loader/Loader";

// Componente de layout para el dashboard. Este componente envuelve el contenido del dashboard y aplica estilos generales.
// Utiliza el hook useRouter de Next.js para manejar la navegación entre las diferentes páginas del dashboard.
// Utiliza el hook personalizado useAuth para obtener el estado de autenticación del usuario, y el hook useState de React para manejar el estado de visualización del dashboard.

export default function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const authStatus = useAuth();

  const handleNavigation = (text: string) => {
    if (text === "dashboard") {
      router.push("/dashboard");
    } else {
      router.push(`/dashboard/${text}`);
    }
  };

  return authStatus.status === false ? (
    <Loader />
  ) : (
    <>
      <div className="w-screen h-screen flex justify-between items-center bg-gray-100">
        <div className="h-screen">
          <Aside handleNavigation={handleNavigation} />
        </div>
        <main className="h-screen flex-grow w-auto bg-gray-100">
          <div className="">{children}</div>
        </main>
      </div>
      <Float />
    </>
  );
}
