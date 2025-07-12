# Perdoor Bus Timing Website (MERN)

This repository contains a full-stack MERN application that shows real-time bus timings for the Perdoor junction and provides an admin panel to manage the schedule.

## Tech Stack

* **Frontend** – React + React-Bootstrap (mobile-first UI)
* **Backend**  – Node.js, Express.js
* **Database** – MongoDB (running locally at `mongodb://127.0.0.1:27017/perdoorbus` by default)

---

## Getting Started

### 1. Clone & install dependencies

```bash
# clone
git clone <repo-url>
cd <repo>

# install backend dependencies
cd backend && npm install

# install frontend dependencies
cd ../frontend && npm install
```

### 2. Run MongoDB locally
Make sure you have MongoDB Community edition installed and the `mongod` service running on port **27017**.

### 3. Start the development servers

Open **two** terminal windows/tabs:

Terminal 1 – **Backend**
```bash
cd backend
npm run dev   # starts Express on http://localhost:5000
```

Terminal 2 – **Frontend**
```bash
cd frontend
npm start     # starts React on http://localhost:3000
```

During development, the React app proxies API requests to the backend (configured automatically by Create React App’s `proxy` field).

### 4. Build for production (optional)
```bash
cd frontend
npm run build    # creates static build in frontend/build
```
Serve the React build with any static server or configure the Express server to serve it.

---

## Project Structure
```
backend/
  server.js           Express entry-point
  models/Bus.js       Mongoose schema
  routes/busRoutes.js REST API routes
frontend/
  src/                React source code
    pages/            Home & Admin pages
    components/       Re-usable UI pieces
```

---

## Features

### Public (no login)
* Search your destination and instantly view the next buses, sorted by how soon they arrive.
* Works great on mobile devices – large touch-friendly buttons and inputs.

### Admin Panel (`/admin`)
* Add, edit or delete buses.
* Toggle *daily / weekdays* availability and activate/deactivate buses.

---

## Environment Variables (optional)
You can override defaults by creating **backend/.env**
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/perdoorbus
```

---

## License
MIT