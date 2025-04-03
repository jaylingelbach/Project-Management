import express from 'express';
import { clerkAuth } from '../controllers/clerkController.js';

const router = express.Router();

router.get('/', clerkAuth);

export default router;