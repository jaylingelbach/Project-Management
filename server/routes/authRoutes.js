import express from 'express';
import { authEndpoint } from '../controllers/authController.js';

const router = express.Router();

router.post('/api/liveblocks-auth', authEndpoint);

export default router;