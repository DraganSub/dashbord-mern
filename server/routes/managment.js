import express from "express";
import { getAdmins, getUserPerformance } from "../controllers/managment.js";

const router = express.Router();

router.get("/admins", getAdmins)
router.get("/performance/:id", getUserPerformance);
export default router;