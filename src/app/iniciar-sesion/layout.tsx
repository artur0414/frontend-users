import React from "react";

// Componente de layout para la página de inicio de sesión
export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-[320px] h-[460px] md:w-[450px] md:h-[560px] px-5 py-12 shadow-lg flex flex-col gap-7 overflow-auto">
      {children}
    </section>
  );
}
