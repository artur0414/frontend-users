import type { Metadata } from "next";
import "./globals.css";

// Define los metadatos de la página

export const metadata: Metadata = {
  title: "CacaoAPI Dashboard",
  description:
    "Un panel interactivo para gestionar y visualizar datos sobre caracterización de plantas de cacao colombiano.",
};

// Define el layout raíz de la aplicación

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Retorna el layout con el contenido de la página (children) dentro de las etiquetas html y body

  return (
    <html lang="es">
      <body className={"w-screen h-screen flex justify-center items-center"}>
        {children}
      </body>
    </html>
  );
}
