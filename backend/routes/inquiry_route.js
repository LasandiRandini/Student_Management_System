import express from "express";
import { submitInquiry,getInquiries } from "../controllers/inquiry_controller.js";

const router = express.Router();


/**
 * @swagger
 * /api/inquiries/inquiry:
 *   post:
 *     summary: Submit a new inquiry
 *     tags: [Inquiry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: string
 *                 description: ID of the student submitting the inquiry
 *               title:
 *                 type: string
 *                 description: Title of the inquiry
 *               message:
 *                 type: string
 *                 description: Body message of the inquiry
 *     responses:
 *       200:
 *         description: Inquiry successfully submitted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: Validation error, such as missing fields
 *       500:
 *         description: Internal server error
 */
router.post("/inquiry", submitInquiry);

router.get("/getinquiries", getInquiries);


export default router;
