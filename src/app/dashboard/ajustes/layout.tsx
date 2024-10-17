// Componente de diseño para la sección de cambio de contraseña

export default function optionsLayout({
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
