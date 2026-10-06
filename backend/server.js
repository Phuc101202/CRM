import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import "dotenv/config";

import {connectDB} from './config/db.js';
import {notFound, errorHandler} from './middleware/error.middleware.js';

import authRoutes from './routes/auth.routes.js';
import leadRoutes from './routes/lead.routes.js';
import contactRoutes from './routes/contact.routes.js';
import noteRoutes from './routes/note.routes.js';
import taskRoutes from './routes/task.route.js';
import aiRoutes from './routes/ai.routes.js';
import analyticsRoutes from './routes/analytics.routes.js'

const app = express();

/* ----------------- Middleware ----------------- */
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

/* ----------------- Routes ----------------- */

app.get('/api/health', (req, res) => {
    res.json({success: true, status: "OK", service: "CRM API"});
});
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);

app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes);

/* ----------------- Error Handling ----------------- */
app.use(notFound);
app.use(errorHandler);

/* ----------------- Boot ----------------- */
const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1);
    }
};

start();

export default app;