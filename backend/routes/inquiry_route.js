import express from "express";
import { submitInquiry,getInquiries } from "../controllers/inquiry_controller.js";

const router = express.Router();

router.post("/inquiry", submitInquiry);
router.get("/getinquiries", getInquiries);

export default router;
