# Rails with PostgreSQL (Backend Ruby on Rails)

Backend del sistema de gestión de usuarios con Ruby on Rails + PostgreSQL.

Este README está pensado para **Linux (Ubuntu/Debian y derivados)**.

---

## Resumen del proyecto

API/backend para gestionar:

- Tipos de persona
- Tipos de documento
- Usuarios

Incluye reglas de negocio y validaciones de dominio (junto con validacion de numero de telefono, correo, nombres, etc).

---

## Stack backend

- Ruby `3.3.6`
- Rails `~> 8.1.2`
- PostgreSQL (`pg`)
- Puma
- rack-cors

## Requisitos (Linux)

- Ruby 3.3.x
- Bundler
- PostgreSQL 14+
- Node.js/npm (para el funcionamiento del frontend)

## Variables de entorno

Usa `.env.example` como plantilla para crear tu archivo `.env` local y completar tus credenciales reales de base de datos.

Debes definir tus datos de PostgreSQL en `.env` con base en este ejemplo:

```dotenv
POSTGRES_USER=tu_usuario_de_postgres
POSTGRES_PASSWORD=tu_contraseña_de_postgres
POSTGRES_HOST=localhost
```

Además, agrega la versión de Ruby usada por el proyecto:

```dotenv
RUBY_VERSION=3.3.6
```

> Recomendado: usar el mismo valor para evitar incompatibilidades al instalar gems o ejecutar Rails.

---

## Instalación (Linux)

Desde la raíz del proyecto:

```bash
bundle install
```

Inicia PostgreSQL:

```bash
sudo service postgresql start
```

Crea y prepara base de datos:

1. Crea la tabla en la base de datos

```bash
rails db:create
```

2. migra las configuraciones

```bash
rails db:migrate
```

3. Corre los datos de la tabla type_document y type_person

```bash
rails db:seed
```

Levanta servidor Rails:

```bash
rails server
```

Disponible en:

- `http://localhost:3000`

---

## Instruciones adicionales

Revisen el readme dentro de la carpeta frontend para poder instalar y configurar la parte de react del proyecto correctamente

## Comandos útiles

```bash
rails test
rails console
rails routes
rails db:migrate:status
```
## Foto del despliegue del Rails

![alt text](image.png)