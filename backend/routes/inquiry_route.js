import express from "express";
import { submitInquiry,getInquiries } from "../controllers/inquiry_controller.js";

const router = express.Router();


/**
 * @swagger
 * /api/inquiries/inquiry:
 *   post:
 *     summary: Submit a new inquiry
 *     description: This endpoint allows a student to submit an inquiry by providing their `studentId`, a `title` for the inquiry, and a detailed `message` body. The submitted inquiry will be recorded and processed by the relevant department or system for further action. Ensure that the `studentId` is valid and associated with an existing student record.
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
 *                 description: The unique ID of the student submitting the inquiry (e.g., "stu12345")
 *               title:
 *                 type: string
 *                 description: A brief title summarizing the inquiry (e.g., "Issue with Course Registration")
 *               message:
 *                 type: string
 *                 description: A detailed description or body of the inquiry message (e.g., "I am unable to register for the upcoming term's courses due to a technical error.")
 *             example:
 *               studentId: "stu12345"
 *               title: "Clarification on Assignment Due Date"
 *               message: "Could you please confirm the due date for the final assignment? The portal shows two different dates."
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
 *                   description: A success message indicating the inquiry has been submitted (e.g., "Inquiry submitted successfully")
 *       400:
 *         description: Validation error, such as missing or improperly formatted fields
 *       500:
 *         description: Internal server error, indicating an issue on the server side
 */
router.post("/inquiry", submitInquiry);

router.get("/getinquiries", getInquiries);


export default router;
