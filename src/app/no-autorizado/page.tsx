"use client";

import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

// Componente para mostrar un error de inicio de sesión

const LoginError = () => {
  return (
    <div className="w-screen flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-5 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-red-600">Error</h2>
        <p className="mt-2">
          No autorizado, por favor inicia sesión o contacta al administrador.
        </p>
        <a
          href="/"
          className="mt-4 inline-block text-custom-blue hover:underline"
        >
          Intenta de nuevo
        </a>
      </div>
    </div>
  );
};

export default LoginError;
