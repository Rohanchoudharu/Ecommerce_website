# Orbit Cart - E-commerce Demo

>A minimal full-stack e-commerce demo with a React (Vite) client and an Express + MongoDB server.

## Tech stack
- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)

## Quick Start
Prerequisites: Node.js (v16+), npm, MongoDB (local or Atlas).

1. Install dependencies

```bash
# server
cd server
npm install

# client
cd ../client
npm install
```

2. Environment

Copy and edit the server environment file:

```bash
cd server
copy .env.example .env
# then edit .env to set MONGO_URI, JWT_SECRET, PORT, CLIENT_URL, etc.
```

3. Seed (optional)

Populate the database with sample data:

```bash
cd server
npm run seed
```

4. Run in development

Open two terminals:

```bash
# terminal 1: start server
cd server
npm run dev

# terminal 2: start client
cd client
npm run dev
```

5. Build for production (client)

```bash
cd client
npm run build
```

## Server scripts
- `npm run dev` — start server with `nodemon` (watch mode)
- `npm run start` — start server in production
- `npm run seed` — run the seed script (see `server/src/seed.js`)

Key server files:
- [server/src/index.js](server/src/index.js) — app entry
- [server/src/config/db.js](server/src/config/db.js) — MongoDB connection
- [server/src/routes](server/src/routes) — API route handlers

## Environment variables (server)
- `MONGO_URI` — MongoDB connection URI (defaults to mongodb://localhost:27017/orbitcart)
- `PORT` — server port (default 5000)
- `CLIENT_URL` — allowed client origin for CORS
- `JWT_SECRET` — secret for signing JWTs

## API (overview)
The server mounts routes under `/api`:

- `POST /api/auth/register` — register a new user
- `POST /api/auth/login` — login and receive a JWT
- `GET /api/products` — list products
- `GET /api/products/:id` — product details
- `POST /api/cart` — manage cart (protected)

Check the route files for full details: [server/src/routes](server/src/routes).

## Project structure

Top-level `ecom/` contains:

- `client/` — React + Vite frontend
- `server/` — Express backend, Mongoose models, routes, seed script

## Notes & Next steps
- If using MongoDB Atlas, set `MONGO_URI` accordingly in `server/.env`.
- Consider adding a production process manager (PM2) and HTTPS for production.

## License
This project is provided as-is for learning and demonstration.
