import express from "express";
import { subscribeNewsletter } from "../controllers/newsletterController.js";

const router = express.Router();

// Public route for newsletter subscription
router.post("/subscribe", subscribeNewsletter);

export default router;
