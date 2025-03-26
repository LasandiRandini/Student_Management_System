
// import express from "express";
// import { sendMessage, getChatHistory, markMessagesAsRead } from "../controllers/chat_controller.js";

// const router = express.Router();

// // Send a message
// router.post("/send", sendMessage);

// // Get chat history between student and admin
// router.get("/history/:sender/:recipient", getChatHistory);

// // Mark messages as read
// router.put("/read", markMessagesAsRead);

// export default router;

import express from "express";
import { sendMessage, getChatHistory, markMessagesAsRead, getStudentsWithMessages } from "../controllers/chat_controller.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/history/:sender/:recipient", getChatHistory);
router.post("/mark-as-read", markMessagesAsRead);
router.get("/students", getStudentsWithMessages);

export default router;