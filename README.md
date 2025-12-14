# Dhakkan — Backend

Lightweight Node.js + Express backend using Sequelize (MySQL) for a sports/event management app.

## Table of contents
- Project overview
- Prerequisites
- Environment variables
- Install & run
- Database: migrations & seeders
- API overview
- Sockets
- Folder structure
- Troubleshooting

## Project overview

This repository contains the backend for Dhakkan. It exposes REST endpoints for authentication, athletes, events, heats and results, and uses Socket.IO to broadcast realtime updates.

## Prerequisites

- Node.js 18+ and npm
- MySQL server (or compatible) accessible from the app
- Optional: `npx` / `sequelize-cli` for migrations and seeders

## Environment variables

Create a `.env` file in the `backend` folder (or set env vars in your environment). Example:

PORT=5000
DB_NAME=dhakkan_db
DB_USER=root
DB_PASSWORD=your_db_password
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DIALECT=mysql
JWT_SECRET=replace-with-a-secure-secret

Notes:
- `JWT_SECRET` defaults to a development value in code if not provided — always set this in production.

## Install & run

From the `backend` folder:

```bash
npm install
```

- Start in production mode:

```bash
npm run start
```
- Start in development mode with live reload:

```bash
npm run dev
```

Available npm scripts (from `backend/package.json`):
- `start` — `node server.js`
- `dev` — `nodemon server.js`
- `migrate` — runs Sequelize migrations via the local `sequelize-cli`

## Database: migrations & seeders

This project uses Sequelize migrations. Create the database named in `DB_NAME` before running migrations.

Run migrations:

```bash
npm run migrate
```

Run seeders (via sequelize-cli). If you have `sequelize-cli` installed locally (devDependency), use:

```bash
npx sequelize-cli db:seed:all --config src/config/sequelize.config.cjs
```

To undo the last migration/seed, use the corresponding `sequelize-cli` commands, for example:

```bash
npx sequelize-cli db:migrate:undo --config src/config/sequelize.config.cjs
npx sequelize-cli db:seed:undo:all --config src/config/sequelize.config.cjs
```

## API overview

Base server: `http://localhost:<PORT>` (defaults to 5000)

Main resource groups (HTTP REST):
- `POST /api/v1/auth/register` — register user
- `POST /api/v1/auth/login` — login (returns JWT)
- `GET/POST/PUT/DELETE /api/v1/athletes` — manage athletes
- `GET/POST/PUT/DELETE /api/v1/events` — manage events
- `GET/POST/PUT/DELETE /api/v1/heats` — manage heats
- `GET/POST/PUT/DELETE /api/v1/results` — manage results

Authentication: endpoints that mutate protected resources require a Bearer JWT in `Authorization` header.

For detailed request/response shapes, inspect the validation and controller files under `backend/src/validations` and `backend/src/controllers`.

## Sockets

Socket.IO is used to broadcast realtime updates. Server socket logic is in `backend/src/sockets/socket.js`.

## Folder structure (important files)

- `server.js` — app entry
- `src/app.js` — Express app + middleware
- `src/routes` — route definitions
- `src/controllers` — controllers for each resource
- `src/services` — business logic
- `src/repositories` — DB access layer (Sequelize)
- `src/models` — Sequelize models
- `src/migrations` — DB migration scripts
- `src/seeders` — seed data
- `src/config` — database and i18n config
- `src/utils` — helper utilities

## Troubleshooting

- If migrations fail, ensure your DB server is running and `DB_*` env vars are correct.
- On `JWT` related errors, ensure `JWT_SECRET` is set consistently between running services.

## Next steps / Contribution

- Add API documentation (Postman collection or OpenAPI) for precise request/response schemas.
- Add end-to-end tests for major flows (auth, results ranking).


