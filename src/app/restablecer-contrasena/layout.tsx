import React from "react";

// Componente de layout para la página de recuperación de contraseña. Este componente envuelve el contenido de la página y aplica estilos generales.

export default function forgotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-[320px] h-[550px] px-5 py-12 shadow-lg md:w-[450px] md:h-[700px] md:p-12 flex flex-col gap-7 overflow-auto">
      {children}
    </section>
  );
}
