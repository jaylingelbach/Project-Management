import express from 'express';
import { clerkAuth } from '../controllers/clerkController.js';

const router = express.Router();

router.get('/api/clerk-users', clerkAuth);

export default router;