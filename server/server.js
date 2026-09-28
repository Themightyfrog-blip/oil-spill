const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
require('dotenv').config(); // also fallback to server/.env if present

const incidentsRouter = require('./routes/incidents');
const chatRouter = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/incidents', incidentsRouter);
app.use('/api/chat', chatRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'AI-Powered Oil Spill Detection, Source Estimation & Forecasting Prototype',
    mode: 'DEMO MODE / SIMULATED DATA',
    groqConfigured: !!(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'YOUR_GROQ_API_KEY_HERE'),
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Serve frontend build if dist folder exists (Single deployable service)
const distPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(distPath)) {
  console.log(`[Server] Serving production client build from ${distPath}`);
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // If not built yet, root informs user
  app.get('/', (req, res) => {
    res.json({
      message: 'Oil Spill Intelligence Backend API is running.',
      endpoints: [
        '/api/incidents',
        '/api/incidents/:id',
        '/api/incidents/:id/environment',
        '/api/incidents/:id/hindcast',
        '/api/incidents/:id/vessels',
        '/api/incidents/:id/history',
        '/api/incidents/:id/forecast',
        '/api/incidents/:id/evidence',
        '/api/chat'
      ],
      notice: 'In development, run the client with "npm run client" or "npm run dev".'
    });
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Only listen when not in Vercel Serverless environment
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🌊 Oil Spill Intelligence System Backend Running`);
    console.log(`📡 Port: ${PORT}`);
    console.log(`🛡️  Mode: DEMO MODE (Simulated Data)`);
    console.log(`🤖 Groq Key: ${process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'YOUR_GROQ_API_KEY_HERE' ? 'Configured' : 'Fallback Engine Active'}`);
    console.log(`====================================================`);
  });
}

module.exports = app;
// hi
