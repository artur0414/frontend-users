// Componente datosLayout. Este es un componente de layout que envuelve a otros componentes para alimentar la api de cacao, actualmente esta en construcción.

export default function datosLayout({
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
