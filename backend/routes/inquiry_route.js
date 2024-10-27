import express from "express";
import { submitInquiry, getInquiries} from "../controllers/inquiry_controller.js";

const router = express.Router();

router.post("/inquiry", submitInquiry);
// Route to get notifications
// router.get("/notifications", getNotifications);

router.get("/inquiries", getInquiries);

export default router;
