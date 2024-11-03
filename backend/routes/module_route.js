

import express from "express";
import { createModule, getModule ,uploadModuleImage} from "../controllers/module_controller.js";

const router = express.Router();

// router.get("/getmodule/:departmentId/:level", getModule);
router.get("/getmodule/:departmentId/:level", getModule);

/**
 * @swagger
 * /api/modules/createmodule:
 *   post:
 *     summary: Create a new module
 *     description: This endpoint allows you to create a new module by providing details such as the module name, description, the department ID it belongs to, the education level, and an optional image file. Make sure the `departmentId` corresponds to an existing department and that the image is uploaded as a binary file.
 *     tags: [Module]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the module (e.g., "Advanced Mathematics")
 *               description:
 *                 type: string
 *                 description: A brief description of the module's content or purpose (e.g., "Covers advanced calculus and algebra topics")
 *               departmentId:
 *                 type: string
 *                 description: The unique ID of the department the module is associated with (e.g., "12345")
 *               level:
 *                 type: string
 *                 description: The education level of the module (e.g., "Undergraduate" or "Postgraduate")
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: An optional image file representing the module (e.g., course cover image)
 *             example:
 *               name: "Physics 101"
 *               description: "Introduction to basic principles of physics"
 *               departmentId: "abc123"
 *               level: "Undergraduate"
 *     responses:
 *       200:
 *         description: Module created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message (e.g., "Module created successfully")
 *                 module:
 *                   type: object
 *                   description: The details of the created module
 *       400:
 *         description: Validation error, such as missing or invalid fields
 *       500:
 *         description: Internal server error, such as a server-side failure or database issue
 */
router.post("/createmodule", uploadModuleImage, createModule);


export default router;
