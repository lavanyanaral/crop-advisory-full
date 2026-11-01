// server.js – Crop Advisory System Backend
require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const path     = require('path');
const fs       = require('fs');
const multer   = require('multer');
const pool     = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Serve uploaded photos
const UPLOAD_DIR = path.join(__dirname, process.env.UPLOAD_DIR || 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOAD_DIR));

// ── Multer (photo uploads) ────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename:    (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB per file
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

// ── Helper ────────────────────────────────────────────────────────────────────
const send = (res, data, status = 200) => res.status(status).json(data);
const err  = (res, msg, status = 500) => res.status(status).json({ error: msg });

// ═════════════════════════════════════════════════════════════════════════════
//  STEP 1 – Farmer Input
// ═════════════════════════════════════════════════════════════════════════════

// POST /api/farmers  – save farmer data (+ optional photos)
app.post('/api/farmers', upload.array('photos', 10), async (req, res) => {
  try {
    const { name, location, soil_type, land_size, current_crop, language } = req.body;
    if (!name || !location || !soil_type || !land_size || !current_crop) {
      return err(res, 'All farmer fields are required', 400);
    }
    const photoNames = req.files ? req.files.map(f => f.filename) : [];
    const [result] = await pool.execute(
      `INSERT INTO farmers (name, location, soil_type, land_size, current_crop, language, photo_names)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, location, soil_type, parseFloat(land_size), current_crop,
       language || 'en', JSON.stringify(photoNames)]
    );
    send(res, { farmer_id: result.insertId, photo_names: photoNames }, 201);
  } catch (e) {
    console.error('POST /api/farmers:', e);
    err(res, 'Failed to save farmer data');
  }
});

// GET /api/farmers/:id  – retrieve farmer
app.get('/api/farmers/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM farmers WHERE id = ?', [req.params.id]);
    if (!rows.length) return err(res, 'Farmer not found', 404);
    const f = rows[0];
    f.photo_names = JSON.parse(f.photo_names || '[]');
    send(res, f);
  } catch (e) {
    err(res, 'Failed to fetch farmer');
  }
});

// GET /api/farmers  – list all farmers (admin / dashboard)
app.get('/api/farmers', async (_req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, location, current_crop, language, created_at FROM farmers ORDER BY created_at DESC'
    );
    send(res, rows);
  } catch (e) {
    err(res, 'Failed to fetch farmers');
  }
});

// ═════════════════════════════════════════════════════════════════════════════
//  STEP 2 – Weather Data
// ═════════════════════════════════════════════════════════════════════════════

// POST /api/weather  – save weather snapshot
app.post('/api/weather', async (req, res) => {
  try {
    const { farmer_id, temperature, rainfall, humidity, crop_impact } = req.body;
    if (!farmer_id) return err(res, 'farmer_id is required', 400);
    const [result] = await pool.execute(
      `INSERT INTO weather_data (farmer_id, temperature, rainfall, humidity, crop_impact)
       VALUES (?, ?, ?, ?, ?)`,
      [farmer_id, temperature, rainfall, humidity, crop_impact]
    );
    send(res, { weather_id: result.insertId }, 201);
  } catch (e) {
    console.error('POST /api/weather:', e);
    err(res, 'Failed to save weather data');
  }
});

// GET /api/weather/:farmer_id  – retrieve latest weather for farmer
app.get('/api/weather/:farmer_id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM weather_data WHERE farmer_id = ? ORDER BY fetched_at DESC LIMIT 1',
      [req.params.farmer_id]
    );
    if (!rows.length) return err(res, 'No weather data found', 404);
    send(res, rows[0]);
  } catch (e) {
    err(res, 'Failed to fetch weather');
  }
});

// ═════════════════════════════════════════════════════════════════════════════
//  STEP 3 – Soil Analysis
// ═════════════════════════════════════════════════════════════════════════════

// POST /api/soil  – save soil analysis result
app.post('/api/soil', async (req, res) => {
  try {
    const { farmer_id, ph_range, nitrogen_level, moisture_level, recommendation, crop_photo_result } = req.body;
    if (!farmer_id) return err(res, 'farmer_id is required', 400);
    const [result] = await pool.execute(
      `INSERT INTO soil_analysis
         (farmer_id, ph_range, nitrogen_level, moisture_level, recommendation, crop_photo_result)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [farmer_id, ph_range, nitrogen_level, moisture_level, recommendation, crop_photo_result]
    );
    send(res, { soil_id: result.insertId }, 201);
  } catch (e) {
    console.error('POST /api/soil:', e);
    err(res, 'Failed to save soil analysis');
  }
});

// GET /api/soil/:farmer_id
app.get('/api/soil/:farmer_id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM soil_analysis WHERE farmer_id = ? ORDER BY analysed_at DESC LIMIT 1',
      [req.params.farmer_id]
    );
    if (!rows.length) return err(res, 'No soil data found', 404);
    send(res, rows[0]);
  } catch (e) {
    err(res, 'Failed to fetch soil data');
  }
});

// ═════════════════════════════════════════════════════════════════════════════
//  STEP 4 – AI Recommendations
// ═════════════════════════════════════════════════════════════════════════════

// POST /api/recommendations  – save AI-generated recommendations
app.post('/api/recommendations', async (req, res) => {
  try {
    const { farmer_id, crop_recommendation, fertilizer_advice, pest_disease_advice, irrigation_advice } = req.body;
    if (!farmer_id) return err(res, 'farmer_id is required', 400);
    const [result] = await pool.execute(
      `INSERT INTO ai_recommendations
         (farmer_id, crop_recommendation, fertilizer_advice, pest_disease_advice, irrigation_advice)
       VALUES (?, ?, ?, ?, ?)`,
      [farmer_id, crop_recommendation, fertilizer_advice, pest_disease_advice, irrigation_advice]
    );
    send(res, { recommendation_id: result.insertId }, 201);
  } catch (e) {
    console.error('POST /api/recommendations:', e);
    err(res, 'Failed to save recommendations');
  }
});

// GET /api/recommendations/:farmer_id
app.get('/api/recommendations/:farmer_id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM ai_recommendations WHERE farmer_id = ? ORDER BY generated_at DESC LIMIT 1',
      [req.params.farmer_id]
    );
    if (!rows.length) return err(res, 'No recommendations found', 404);
    send(res, rows[0]);
  } catch (e) {
    err(res, 'Failed to fetch recommendations');
  }
});

// ═════════════════════════════════════════════════════════════════════════════
//  STEP 7 – Feedback
// ═════════════════════════════════════════════════════════════════════════════

// POST /api/feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const { farmer_id, rating, feedback_text, crop_result } = req.body;
    if (!farmer_id || !rating) return err(res, 'farmer_id and rating are required', 400);
    if (rating < 1 || rating > 5) return err(res, 'rating must be 1–5', 400);
    const [result] = await pool.execute(
      `INSERT INTO feedback (farmer_id, rating, feedback_text, crop_result)
       VALUES (?, ?, ?, ?)`,
      [farmer_id, rating, feedback_text || null, crop_result || null]
    );
    send(res, { feedback_id: result.insertId }, 201);
  } catch (e) {
    console.error('POST /api/feedback:', e);
    err(res, 'Failed to save feedback');
  }
});

// GET /api/feedback  – all feedback (admin)
app.get('/api/feedback', async (_req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT f.id, fa.name AS farmer_name, fa.location, f.rating,
              f.feedback_text, f.crop_result, f.submitted_at
       FROM feedback f
       JOIN farmers fa ON fa.id = f.farmer_id
       ORDER BY f.submitted_at DESC`
    );
    send(res, rows);
  } catch (e) {
    err(res, 'Failed to fetch feedback');
  }
});

// ═════════════════════════════════════════════════════════════════════════════
//  FULL SESSION VIEW
// ═════════════════════════════════════════════════════════════════════════════

// GET /api/session/:farmer_id  – complete advisory session summary
app.get('/api/session/:farmer_id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM advisory_sessions WHERE farmer_id = ?',
      [req.params.farmer_id]
    );
    if (!rows.length) return err(res, 'Session not found', 404);
    send(res, rows[0]);
  } catch (e) {
    err(res, 'Failed to fetch session');
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => send(res, { status: 'ok', timestamp: new Date() }));

// ── Catch-all: serve index.html for frontend routing ─────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🌾 Crop Advisory Server running on http://localhost:${PORT}`);
});
