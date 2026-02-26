# Rails with PostgreSQL (Backend Ruby on Rails)

Backend del sistema de gestión de usuarios con Ruby on Rails + PostgreSQL.

Este README está pensado para **Linux (Ubuntu/Debian y derivados)**.

---

## Resumen del proyecto

API/backend para gestionar:

- Tipos de persona
- Tipos de documento
- Usuarios

Incluye reglas de negocio y validaciones de dominio (incluyendo reglas recientes para documentos y teléfonos en formato venezolano).

---

## Stack backend

- Ruby `3.3.6`
- Rails `~> 8.1.2`
- PostgreSQL (`pg`)
- Puma
- rack-cors

### Gems de soporte

- `brakeman`, `bundler-audit`
- `rubocop-rails-omakase`
- `debug`, `web-console`
- `capybara`, `selenium-webdriver`

---

## Requisitos (Linux)

- Ruby 3.3.x
- Bundler
- PostgreSQL 14+
- Node.js/npm (solo si también vas a trabajar frontend)

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

```bash
bin/rails db:create
bin/rails db:migrate
bin/rails db:seed
```

Levanta servidor Rails:

```bash
bin/rails server
```

Disponible en:

- `http://localhost:3000`

---

## Instruciones adicionales

Revisen el readme dentro de la carpeta frontend para poder instalar y configurar la parte de react del proyecto correctamente

## Comandos útiles

```bash
bin/rails test
bin/rails console
bin/rails routes
bin/rails db:migrate:status
```
