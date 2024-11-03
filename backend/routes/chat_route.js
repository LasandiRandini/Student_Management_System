
import express from "express";
import { sendMessage, getChatHistory, markMessagesAsRead } from "../controllers/chat_controller.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/history/:sender/:recipient", getChatHistory);
router.post("/mark-as-read", markMessagesAsRead);

export default router;