# Frontend Users 

### Introducción a la Vista

Este proyecto es un frontend diseñado para interactuar con una [API RESTful de autenticación](https://github.com/artur0414/backend-users.git), facilitando la gestión de usuarios en el contexto de la API de gestión de cacao. Actualmente, el sistema permite a los usuarios autenticarse, registrar nuevos usuarios y gestionar su información personal. La interfaz es intuitiva y está estructurada para proporcionar una experiencia fluida mientras se espera la integración con la API de gestión de cacao, que ampliará las funcionalidades del sistema, permitiendo a los usuarios gestionar datos relacionados con el cultivo, procesamiento y distribución del cacao.

## Tabla de Contenidos 
- [Características](#características) 
- [Tecnologías](#tecnologías)
- [Instalación](#instalación) 
- [Uso](#uso) 
- [Contribuciones](#contribuciones) 

## Características 
- **Inicio de sesión**: Los usuarios pueden iniciar sesión utilizando sus credenciales. 
- **Gestión de contraseñas**: Los usuarios pueden actualizar su contraseña. 
- **Interfaz de usuario**: Diseño moderno y receptivo utilizando Tailwind CSS. 
- **Indicadores de carga**: Los componentes muestran un loader mientras se procesan las solicitudes. 


## Tecnologías
- **React**: Biblioteca de JavaScript para construir interfaces de usuario. 
- **Next.js**: Framework para React que permite la renderización del lado del servidor. 
- **TypeScript**: Superconjunto de JavaScript que proporciona tipado estático. 
- **Tailwind CSS**: Framework de CSS para crear diseños modernos. 
- **Heroicons**: Iconos SVG de alta calidad para React. 

## Instalación
Para instalar y ejecutar el proyecto en tu entorno local, sigue estos pasos: 
1. Clona este repositorio: 
   ```bash 
       git clone <https://github.com/artur0414/backend-users.git> 

   ```
2. Navega al directorio del proyecto:
    ```bash 
        cd frontend-users 
   ``` 
3. Instala las dependencias: 
    ```bash 
        npm install 
    
    ``` 
4. Inicia la aplicación en modo de desarrollo: 
   ```bash 
        npm run dev 
     ``` 
 5. Abre tu navegador y visita `http://localhost:3000`. 

## Uso 
 - **Iniciar sesión**: Los usuarios pueden ingresar su nombre de usuario y contraseña en el formulario de inicio de sesión. 
 - **Actualizar contraseña**: Los usuarios pueden acceder a la opción de actualizar su contraseña en el panel de usuario. 
 - **Cerrar sesión**: Los usuarios pueden cerrar sesión utilizando el botón correspondiente. 

## Contribuciones 
 Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos: 
  1. Realiza un fork del repositorio. 
  2. Crea una nueva rama para tu función: 
      ```bash 
          git checkout -b feature/nueva-funcion 
      ``` 
  3. Realiza tus cambios y haz commit: 
      ```bash 
         git commit -m "Añadida nueva función" 
      ``` 
  4. Envía un pull request.

