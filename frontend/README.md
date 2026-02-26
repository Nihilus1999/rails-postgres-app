# Frontend React (Vite + MUI)

Interfaz web del proyecto `rails-postgres-app`, desarrollada con React y Vite.

Este README está orientado a **Linux** (Ubuntu/Debian y derivados).

---

## Descripción breve

Frontend para gestión de usuarios con:

- Registro de usuario con validaciones alineadas a backend Ruby.
- Tabla moderna de usuarios con acciones (ver, editar, eliminar).
- Modal de detalles con todos los datos del usuario.
- Notificaciones visuales tipo Snackbar.

---

## Tecnologías y librerías

### Base

- React `19.x`
- Vite `7.x`
- React Router DOM `7.x`

### UI / UX

- MUI (`@mui/material`)

### Formularios y networking

- `react-hook-form`
- `axios`

---

## Requisitos (Linux)

- Node.js `18+`
- npm `9+`

Verifica:

```bash
node -v
npm -v
```

## Variables de entorno

Usa `.env.example` como plantilla para crear tu archivo `.env` local y completar tus credenciales reales de base de datos. Este frontend usa la variable:

- `VITE_LOCAL_HOST` → URL base del backend (usada en `src/configs/axios/index.js`).

Ejemplo de archivo `frontend/.env`:

```bash
VITE_LOCAL_HOST=http://localhost:3000
```

> Nota: en Vite, las variables expuestas al cliente deben comenzar por `VITE_`.

---

## Instalación y ejecución (Linux)

Desde la carpeta `frontend` (coloque cd frontend):

```bash
npm install
npm run frontend
```

App disponible en:

- `http://localhost:5173`

> Asegúrate de tener el backend Rails corriendo para consumir la API.

---

## Troubleshooting rápido (Linux)

- Si falla `npm install`, limpia caché:

```bash
npm cache clean --force
npm install
```
---

## Fotos del frontend

1. Vista del home (inicio del app)

![alt text](image.png)

2. Tabla con todos los usuarios

![alt text](image-1.png)

3. Vista de crear usuario

![alt text](image-2.png)

4. Modal con los detalles creados

![alt text](image-3.png)

5. Vista de edicion del usuario

![alt text](image-4.png)

6. Modal para eliminar usuario

![alt text](image-5.png)