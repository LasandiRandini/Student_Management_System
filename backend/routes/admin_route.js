// import express from "express"
// import { alogin,aregister} from "../controllers/admin_controller.js"

// const router = express.Router();

// router.post("/alogin", alogin);
// router.post("/aregister", aregister);


// export default router;

// admin_route.js
import express from "express";
import { alogin, aregister,sendEventReminder,sendExamResult, sendAssessmentReminder,sendNotification } from "../controllers/admin_controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/admins/alogin:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 otherProperties:
 *                   type: object
 *       400:
 *         description: Wrong username or password
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
router.post("/alogin", alogin);

/**
 * @swagger
 * /api/admins/aregister:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               contact_no:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 admin:
 *                   type: object
 *       400:
 *         description: Validation error
 *       409:
 *         description: Admin already exists
 *       500:
 *         description: Internal server error
 */
router.post("/aregister", aregister);
router.post("/send-event", sendEventReminder);
router.post("/send-result", sendExamResult);
router.post("/send-assessment", sendAssessmentReminder);
router.post("/sendNotification", sendNotification);


export default router;
