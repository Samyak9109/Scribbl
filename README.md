# Scribbl

Scribbl is a collaborative whiteboard built with React, Vite, Redux Toolkit,
Express, and Socket.IO. Users can join rooms, draw in real time, add shapes and
text, switch board appearance, and export the board as an image.

## Features

- Realtime room-based drawing with Socket.IO
- Pen, eraser, text, move, select, resize, undo, redo, and delete controls
- Prebuilt shapes including flowchart shapes, arrows, and lines
- Color picker with Hex, RGB, and HSL inputs
- Light/dark themes and blank/grid page styles
- Room create/join/leave controls
- PNG export

## Project Structure

```text
client/
  src/
    components/        React UI components
    config/            Frontend runtime configuration
    constants/         Shared UI and whiteboard constants
    redux/             Redux store and slices
    socket/            Socket.IO client instance
    utils/             Pure helpers for color, geometry, rendering, IDs

server/
  src/
    config/            Backend runtime configuration
    services/          In-memory room board store
    socket/            Socket.IO event registration
    utils/             Input validation helpers
  server.js            Server entrypoint
```

## Environment Variables

Client:

```bash
VITE_SOCKET_URL=http://localhost:3001
```

Server:

```bash
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
```

Example files are provided in `client/.env.example` and `server/.env.example`.

## Running Locally

Install and run the server:

```bash
cd server
npm install
npm run dev
```

Install and run the client:

```bash
cd client
npm install
npm run dev
```

Open the Vite URL, usually `http://localhost:5173`.

## Production Build

```bash
cd client
npm run build
```

```bash
cd server
npm start
```

## Deploying The Client To Netlify

This repository includes `netlify.toml`, so Netlify can deploy the Vite client
from the project root.

When Netlify reads `netlify.toml`, it uses:

```text
Base directory: client
Build command: npm run build
Publish directory: dist
Node version: 22
```

If you configure Netlify manually without `netlify.toml`, use `client/dist` as
the publish directory from the repository root.

Add this environment variable in Netlify:

```bash
VITE_SOCKET_URL=https://your-socket-server.example.com
```

The frontend can be hosted on Netlify, but the Socket.IO backend needs a
separate long-running Node host such as Render, Railway, Fly.io, or a VPS.
After deploying the backend, set `CLIENT_ORIGIN` on the server to your Netlify
site URL.

## Notes

The server currently stores room boards in memory. This keeps the project
lightweight for demos and hackathons, but boards reset when the server restarts.
For production persistence, replace `server/src/services/roomStore.js` with a
database-backed implementation.
