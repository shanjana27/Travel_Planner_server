import express from 'express';
import { getActivities, addActivity, updateActivity } from '../Controller/activityController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:tripId', verifyToken, getActivities);
router.post('/:tripId', verifyToken, addActivity);
router.put('/:id', verifyToken, updateActivity);

export default router;