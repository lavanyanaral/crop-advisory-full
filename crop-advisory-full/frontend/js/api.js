// api.js – Shared API helper for Crop Advisory frontend
// All pages include this script to talk to the backend

const API_BASE = window.location.origin + '/api';

const CropAPI = {

  // ── Helpers ────────────────────────────────────────────────────────────────
  async _post(path, data) {
    const res = await fetch(API_BASE + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e.error || `HTTP ${res.status}`);
    }
    return res.json();
  },

  async _postForm(path, formData) {
    const res = await fetch(API_BASE + path, {
      method: 'POST',
      body: formData, // multipart, no Content-Type header needed
    });
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e.error || `HTTP ${res.status}`);
    }
    return res.json();
  },

  async _get(path) {
    const res = await fetch(API_BASE + path);
    if (!res.ok) {
      const e = await res.json().catch(() => ({}));
      throw new Error(e.error || `HTTP ${res.status}`);
    }
    return res.json();
  },

  // ── Session ID helpers (still kept in localStorage as a thin reference) ───
  getFarmerId()        { return localStorage.getItem('farmerId'); },
  setFarmerId(id)      { localStorage.setItem('farmerId', String(id)); },
  clearFarmerId()      { localStorage.removeItem('farmerId'); },

  // ── Step 1: Farmer Input ──────────────────────────────────────────────────
  async saveFarmer(data, photoFiles) {
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.append(k, v));
    if (photoFiles) {
      Array.from(photoFiles).forEach(f => fd.append('photos', f));
    }
    const result = await this._postForm('/farmers', fd);
    this.setFarmerId(result.farmer_id);
    return result;
  },

  async getFarmer(id) {
    return this._get('/farmers/' + (id || this.getFarmerId()));
  },

  // ── Step 2: Weather ───────────────────────────────────────────────────────
  async saveWeather(data) {
    return this._post('/weather', { farmer_id: this.getFarmerId(), ...data });
  },

  async getWeather() {
    return this._get('/weather/' + this.getFarmerId());
  },

  // ── Step 3: Soil Analysis ─────────────────────────────────────────────────
  async saveSoil(data) {
    return this._post('/soil', { farmer_id: this.getFarmerId(), ...data });
  },

  async getSoil() {
    return this._get('/soil/' + this.getFarmerId());
  },

  // ── Step 4: AI Recommendations ────────────────────────────────────────────
  async saveRecommendations(data) {
    return this._post('/recommendations', { farmer_id: this.getFarmerId(), ...data });
  },

  async getRecommendations() {
    return this._get('/recommendations/' + this.getFarmerId());
  },

  // ── Step 7: Feedback ──────────────────────────────────────────────────────
  async saveFeedback(data) {
    return this._post('/feedback', { farmer_id: this.getFarmerId(), ...data });
  },

  // ── Full session (for report page) ────────────────────────────────────────
  async getSession() {
    return this._get('/session/' + this.getFarmerId());
  },
};
