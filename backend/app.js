const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Import routes
const routes = require('./routes');

// Import database
const { testConnection } = require('./models');

const app = express();
const PORT = process.env.PORT || 7000;

// ==================== MIDDLEWARE ====================
// Bảo mật
app.use(helmet());

// CORS
app.use(cors());

// Logging
app.use(morgan('combined'));

// Parse JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ==================== ROUTES ====================
app.use('/api', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'KidsLock API Server',
    version: '1.0.0',
    endpoints: {
      phu_huynh: '/api/phu-huynh',
      tre_em: '/api/tre-em',
      thiet_bi: '/api/thiet-bi',
      goi: '/api/goi',
      health: '/api/health'
    }
  });
});

// ==================== ERROR HANDLING ====================
// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint không tồn tại',
    path: req.originalUrl
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global Error:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Lỗi server nội bộ',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// ==================== SERVER START ====================
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    // Start server
    app.listen(PORT,"0.0.0.0", () => {
      console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Không thể khởi động server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
