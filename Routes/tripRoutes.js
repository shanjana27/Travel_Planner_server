import express from "express";
import { createTrip, getAllTrips, deleteTrip, updateTrip } from "../Controller/controller.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // 👈 import your auth middleware

const router = express.Router();

// Routes with authentication
router.post("/", verifyToken, createTrip);
router.post("/create", verifyToken, createTrip);
router.get("/", verifyToken, getAllTrips);
router.delete("/:id", verifyToken, deleteTrip);
router.put("/:id", verifyToken, updateTrip);

export default router;
