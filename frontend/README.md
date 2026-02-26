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

- Node.js `18+` (recomendado `20+`)
- npm `9+`

Verifica:

```bash
node -v
npm -v
```

---

## Instalación y ejecución (Linux)

Desde la carpeta `frontend`:

```bash
npm install
npm run dev
```

## Variables de entorno

Este frontend usa la variable:

- `VITE_LOCAL_HOST` → URL base del backend (usada en `src/configs/axios/index.js`).

Ejemplo de archivo `frontend/.env`:

```bash
VITE_LOCAL_HOST=http://localhost:3000
```

> Nota: en Vite, las variables expuestas al cliente deben comenzar por `VITE_`.

App disponible en:

- `http://localhost:5173`

> Asegúrate de tener el backend Rails corriendo para consumir la API.

---

## Scripts disponibles

```bash
npm run frontend  # servidor de desarrollo
npm run build     # build de producción
npm run preview   # previsualizar build
npm run lint      # ejecutar linter
```

---

## Troubleshooting rápido (Linux)

- Si falla `npm install`, limpia caché:

```bash
npm cache clean --force
npm install
```
