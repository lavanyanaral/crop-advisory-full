# 🌾 Crop Advisory System — Full Stack (Node.js + MySQL)

A 7-step multilingual crop advisory app for small & marginal farmers.
Supports **English**, **Hindi (हिंदी)**, and **Marathi (मराठी)**.

---

## 📁 Project Structure

```
crop-advisory-full/
├── backend/
│   ├── server.js          ← Express REST API
│   ├── db.js              ← MySQL connection pool
│   ├── schema.sql         ← Database schema (run once)
│   ├── package.json
│   ├── .env.example       ← Copy to .env and fill in values
│   └── uploads/           ← Auto-created; stores farmer photos
└── frontend/
    ├── index.html         ← Language selection (Step 0)
    ├── css/style.css
    ├── js/
    │   ├── translations.js ← All multilingual strings
    │   └── api.js          ← Frontend API client (talks to backend)
    └── pages/
        ├── farmer-input.html   ← Step 1: Farmer details
        ├── weather.html        ← Step 2: Weather data
        ├── soil-analysis.html  ← Step 3: Soil & crop analysis
        ├── ai-processing.html  ← Step 4: AI recommendations
        ├── report.html         ← Step 5: Advisory report
        ├── farmer-action.html  ← Step 6: Action checklist
        └── feedback.html       ← Step 7: Rating & feedback
```

---

## ⚙️ Setup Instructions

### 1. MySQL Database

Make sure MySQL is running, then:

```bash
mysql -u root -p < backend/schema.sql
```

This creates the `crop_advisory_db` database and all tables.

### 2. Backend Configuration

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in your MySQL credentials:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=crop_advisory_db
```

### 3. Install Dependencies & Start

```bash
cd backend
npm install
npm start          # production
# or
npm run dev        # development with auto-reload (nodemon)
```

### 4. Open the App

Visit **http://localhost:3000** in your browser.

The backend serves the frontend automatically — no separate web server needed.

---

## 🗄️ Database Tables

| Table | Purpose |
|---|---|
| `farmers` | Farmer profile, soil type, crop, language |
| `weather_data` | Weather snapshot per session |
| `soil_analysis` | pH, nitrogen, moisture, recommendation |
| `ai_recommendations` | Crop, fertilizer, pest, irrigation advice |
| `feedback` | Star rating + comments |
| `advisory_sessions` | VIEW joining all tables for reporting |

---

## 🔌 REST API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/farmers` | Save farmer + upload photos |
| GET | `/api/farmers/:id` | Get farmer by ID |
| GET | `/api/farmers` | List all farmers |
| POST | `/api/weather` | Save weather snapshot |
| GET | `/api/weather/:farmer_id` | Get latest weather |
| POST | `/api/soil` | Save soil analysis |
| GET | `/api/soil/:farmer_id` | Get soil data |
| POST | `/api/recommendations` | Save AI recommendations |
| GET | `/api/recommendations/:farmer_id` | Get recommendations |
| POST | `/api/feedback` | Submit feedback & rating |
| GET | `/api/feedback` | List all feedback (admin) |
| GET | `/api/session/:farmer_id` | Full session summary |
| GET | `/api/health` | Health check |

---

## 🌐 How Frontend ↔ Backend Works

1. **Language selection** (`index.html`) stores language in `localStorage`
2. **Step 1** (`farmer-input.html`) POSTs farmer data + photos → gets back `farmer_id`, stored in `localStorage`
3. **Steps 2–4** use `farmer_id` to POST weather, soil, and recommendation data to MySQL
4. **Steps 5–6** read from `localStorage` (fast UI) — data already saved in DB
5. **Step 7** POSTs feedback rating to MySQL

All data is persisted in MySQL. `localStorage` is used only as a fast local cache for UI display.

---

## 📸 Photo Uploads

- Farmer crop/soil photos are uploaded via multipart form
- Stored in `backend/uploads/` directory
- Filenames saved in `farmers.photo_names` as JSON array
- Served statically at `http://localhost:3000/uploads/<filename>`

---

## 🛠️ Requirements

- Node.js 18+
- MySQL 8.0+
- npm

---

## 🚀 Production Deployment Tips

1. Use environment variables — never commit `.env`
2. Use `pm2` to keep Node running: `pm2 start backend/server.js`
3. Put Nginx in front as a reverse proxy
4. Move `uploads/` to cloud storage (AWS S3, Cloudinary) for scale
5. Add authentication for the `/api/farmers` list and `/api/feedback` admin routes
