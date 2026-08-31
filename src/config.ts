/**
 * Configuración global del cliente para Paralelismo Profético
 */

// URL de producción del Backend (Cambiar por la URL real de despliegue)
export const API_BASE_URL = 'https://paralelismoprofetico.app.example.com';

// Detecta si estamos en el cliente (navegador/Android)
export const isProduction = true;

export function getApiUrl(endpoint: string): string {
  // Si estamos en desarrollo web local, podríamos querer usar localhost
  // Pero para el APK, siempre necesitamos la URL absoluta.

  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  return `${base}${path}`;
}
