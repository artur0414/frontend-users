// Componente de layout para el dashboard/perfil. Este componente envuelve el contenido del dashboard/perfil.

export default function userLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
}
