// Componente de layout para la página de recuperación de contraseña
export default function forgotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-[320px] h-[550px] md:w-[450px] md:h-[600px] px-5 py-12 shadow-lg flex flex-col gap-7 overflow-auto">
      {children}
    </section>
  );
}
