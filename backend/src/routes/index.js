import express from 'express';
import productRoutes from './productRoutes.js';
import mlRoutes from './mlRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'API is working!',
        timestamp: new Date().toISOString(),
    });
});

// Auth routes placeholder
router.get('/auth/status', (req, res) => {
    res.json({
        success: true,
        isAuthenticated: false,
    });
});

// Product & recommendation routes
router.use('/products', productRoutes);

// ML Service routes
router.use('/ml', mlRoutes);

// Auth routes
router.use('/auth', authRoutes);

export default router;
