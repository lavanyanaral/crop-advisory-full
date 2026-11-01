-- Crop Advisory System - MySQL Schema
-- Run this once to set up the database

CREATE DATABASE IF NOT EXISTS crop_advisory_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE crop_advisory_db;

-- Farmers table: stores farmer profile data
CREATE TABLE IF NOT EXISTS farmers (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(150) NOT NULL,
  location     VARCHAR(200) NOT NULL,
  soil_type    VARCHAR(100) NOT NULL,
  land_size    DECIMAL(6,2) NOT NULL,
  current_crop VARCHAR(100) NOT NULL,
  language     ENUM('en','hi','mr') DEFAULT 'en',
  photo_names  TEXT,                        -- JSON array of uploaded photo filenames
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Weather snapshots: one row per advisory session
CREATE TABLE IF NOT EXISTS weather_data (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  farmer_id    INT NOT NULL,
  temperature  DECIMAL(5,2),
  rainfall     DECIMAL(6,2),
  humidity     DECIMAL(5,2),
  crop_impact  TEXT,
  fetched_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
);

-- Soil analysis results
CREATE TABLE IF NOT EXISTS soil_analysis (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  farmer_id         INT NOT NULL,
  ph_range          VARCHAR(20),
  nitrogen_level    VARCHAR(50),
  moisture_level    VARCHAR(50),
  recommendation    TEXT,
  crop_photo_result TEXT,
  analysed_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
);

-- AI-generated recommendations
CREATE TABLE IF NOT EXISTS ai_recommendations (
  id                  INT AUTO_INCREMENT PRIMARY KEY,
  farmer_id           INT NOT NULL,
  crop_recommendation TEXT,
  fertilizer_advice   TEXT,
  pest_disease_advice TEXT,
  irrigation_advice   TEXT,
  generated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
);

-- Feedback and ratings
CREATE TABLE IF NOT EXISTS feedback (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  farmer_id    INT NOT NULL,
  rating       TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  feedback_text TEXT,
  crop_result  VARCHAR(255),
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
);

-- Session view: handy join for the full advisory cycle
CREATE OR REPLACE VIEW advisory_sessions AS
SELECT
  f.id          AS farmer_id,
  f.name        AS farmer_name,
  f.location,
  f.soil_type,
  f.land_size,
  f.current_crop,
  f.language,
  f.created_at,
  w.temperature,
  w.rainfall,
  w.humidity,
  s.ph_range,
  s.nitrogen_level,
  a.crop_recommendation,
  a.fertilizer_advice,
  a.pest_disease_advice,
  a.irrigation_advice,
  fb.rating,
  fb.feedback_text
FROM farmers f
LEFT JOIN weather_data  w  ON w.farmer_id  = f.id
LEFT JOIN soil_analysis s  ON s.farmer_id  = f.id
LEFT JOIN ai_recommendations a ON a.farmer_id = f.id
LEFT JOIN feedback fb      ON fb.farmer_id = f.id;
