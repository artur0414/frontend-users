/*
  Este es el componente Loader, que se encarga de mostrar un indicador de carga cuando se está cargando algo en la aplicación.
*/

export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="animate-spin h-10 w-10 border-4 border-custom-blue border-t-transparent rounded-full"></div>
      <span className="text-custom-blue ml-4">Cargando...</span>
    </div>
  );
};

export default Loader;
