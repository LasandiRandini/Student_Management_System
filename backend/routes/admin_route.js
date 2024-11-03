import express from "express";
import { alogin, aregister } from "../controllers/admin_controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/admins/alogin:
 *   post:
 *     summary: Admin login
 *     description: Allows an admin to log in using their `username` and `password`. Upon successful authentication, the response includes the admin's username and other relevant properties. This endpoint is used for secure access to admin functionalities.
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
 *                 description: The unique username of the admin (e.g., "admin123")
 *               password:
 *                 type: string
 *                 description: The password associated with the admin account (e.g., "secureAdminPass")
 *             example:
 *               username: "admin123"
 *               password: "secureAdminPass"
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
 *                   description: Username of the logged-in admin
 *                 otherProperties:
 *                   type: object
 *                   description: Other relevant admin details or tokens
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
 *     description: This endpoint registers a new admin by accepting necessary information such as `first_name`, `last_name`, `contact_no`, `email`, `username`, and `password`. This is intended for setting up new admin accounts with unique `username` and `email` identifiers.
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
 *                 description: First name of the admin (e.g., "Alice")
 *               last_name:
 *                 type: string
 *                 description: Last name of the admin (e.g., "Johnson")
 *               contact_no:
 *                 type: string
 *                 description: Contact number of the admin (e.g., "+123456789")
 *               email:
 *                 type: string
 *                 description: Email address of the admin (e.g., "alice.johnson@example.com")
 *               username:
 *                 type: string
 *                 description: Unique username for the admin (e.g., "alice_admin")
 *               password:
 *                 type: string
 *                 description: Password for the admin account (e.g., "adminSecurePass")
 *             example:
 *               first_name: "Alice"
 *               last_name: "Johnson"
 *               contact_no: "+123456789"
 *               email: "alice.johnson@example.com"
 *               username: "alice_admin"
 *               password: "adminSecurePass"
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
 *                   description: Success message indicating registration completion
 *                 admin:
 *                   type: object
 *                   description: Details of the registered admin
 *       400:
 *         description: Validation error or missing fields
 *       409:
 *         description: Admin already exists
 *       500:
 *         description: Internal server error
 */
router.post("/aregister", aregister);

export default router;
