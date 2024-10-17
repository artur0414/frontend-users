import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center min-h-screen bg-gray-50 px-4 gap-4">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
        404 - No Encontrado
      </h2>
      <p className="mt-4 text-sm md:text-md text-gray-500 text-center max-w-md">
        Lo sentimos, no hemos podido encontrar el recurso que estás buscando.
      </p>
      <Link href="/">
        <button className="mt-6 bg-custom-blue text-white py-2 px-6 rounded-full text-md md:text-lgtransition duration-200 ease-in-out shadow-md">
          Regresar a Inicio
        </button>
      </Link>
    </div>
  );
}
