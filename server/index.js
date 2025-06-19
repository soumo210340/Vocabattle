import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Routes
app.use('/api/auth', (await import('./routes/auth.js')).default);
app.use('/api/lessons', (await import('./routes/lesson.js')).default);
app.use('/api/progress', (await import('./routes/progress.js')).default);
app.use('/api/users', (await import('./routes/user.js')).default);

const PORT = process.env.PORT || 5000;

// Start server and connect to database
const startServer = async () => {
  try {
    await connectDB();
    console.log('\x1b[36m%s\x1b[0m', '=== Backend Development Server ===');
    console.log('\x1b[32m%s\x1b[0m', `✓ Server is running at: http://localhost:${PORT}`);
    console.log('\x1b[32m%s\x1b[0m', '✓ MongoDB database connected successfully');
    console.log('\x1b[33m%s\x1b[0m', '⚡ Environment:', process.env.NODE_ENV || 'development');
    console.log('\x1b[35m%s\x1b[0m', '📝 Project: VocaBattle Backend API');
    console.log('\x1b[34m%s\x1b[0m', '🔄 API Routes loaded and ready');
    console.log('\x1b[90m%s\x1b[0m', '-----------------------------------');
    console.log('\x1b[90m%s\x1b[0m', 'Available endpoints:');
    console.log('\x1b[90m%s\x1b[0m', '- Auth: /api/auth/*');
    console.log('\x1b[90m%s\x1b[0m', '- Lessons: /api/lessons/*');
    console.log('\x1b[90m%s\x1b[0m', '- Progress: /api/progress/*');
    console.log('\x1b[90m%s\x1b[0m', '-----------------------------------');
  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Error starting server:');
    console.error('\x1b[31m%s\x1b[0m', error.message);
    process.exit(1);
  }
};

app.listen(PORT, () => startServer());
