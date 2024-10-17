// Componente usersLayout. Este es un componente de dashboard/usuarios que envuelve a otros componentes o páginas.

export default function usersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
}
