// src/configs/axios/index.js
import axios from "axios";

const baseURL = import.meta.env.VITE_LOCAL_HOST;

const index = axios.create({
  baseURL,
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
  },
});

// Interceptor de Peticiones (Request)
index.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!config.params) {
      config.params = {};
    }
    config.params.t = Date.now();

    return config;
  },
  (error) => Promise.reject(error)
);

index.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendData = error?.response?.data;
    
    if (backendData?.errors && Array.isArray(backendData.errors)) {
      return Promise.reject(new Error(backendData.errors.join(" / ")));
    }

    const backendMsg = backendData?.message || backendData?.error || backendData?.detail;
    if (backendMsg) {
      return Promise.reject(new Error(backendMsg));
    }

    const status = error?.response?.status;
    let generalMessage = "Ocurrió un error inesperado. Intenta más tarde.";

    switch (status) {
      case 400: generalMessage = "Datos inválidos. Verifica tu solicitud."; break;
      case 401: generalMessage = "No autenticado. Por favor, inicia sesión nuevamente."; break;
      case 403: generalMessage = "No tienes permisos para realizar esta acción."; break;
      case 404: generalMessage = "El recurso solicitado no fue encontrado."; break;
      case 422: generalMessage = "Error de validación. Revisa los datos enviados."; break;
      case 500: generalMessage = "Error interno del servidor. Intenta más tarde."; break;
    }

    return Promise.reject(new Error(generalMessage));
  }
);

export default index;