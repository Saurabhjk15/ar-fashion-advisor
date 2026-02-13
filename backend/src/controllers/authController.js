import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key_12345', {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: { message: 'Please provide all fields' } });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, error: { message: 'User already exists' } });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                success: true,
                data: {
                    user: {
                        _id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token: generateToken(user._id),
                },
            });
        } else {
            res.status(400).json({ success: false, error: { message: 'Invalid user data' } });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for email and password
        if (!email || !password) {
            return res.status(400).json({ success: false, error: { message: 'Please provide email and password' } });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({ success: false, error: { message: 'User does not exist' } });
        }

        // Check availability (Brute force protection)
        if (user.lockUntil && user.lockUntil > Date.now()) {
            const remainingMinutes = Math.ceil((user.lockUntil - Date.now()) / 60000);
            return res.status(429).json({
                success: false,
                error: { message: `Account locked. Please try again in ${remainingMinutes} minutes.` }
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            // Increment login attempts
            user.loginAttempts += 1;

            // Lock account if attempts >= 5
            if (user.loginAttempts >= 5) {
                user.lockUntil = Date.now() + 5 * 60 * 1000; // 5 minutes
                await user.save();
                return res.status(429).json({
                    success: false,
                    error: { message: 'Too many failed attempts. Account locked for 5 minutes.' }
                });
            }

            await user.save();
            return res.status(401).json({ success: false, error: { message: 'Incorrect credentials. Please try again.' } });
        }

        // Successful logic - reset attempts
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();

        res.json({
            success: true,
            data: {
                user: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token: generateToken(user._id),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: {
                user,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, error: { message: error.message } });
    }
};
