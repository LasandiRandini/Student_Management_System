

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
 *                 description: Name of the module
 *               description:
 *                 type: string
 *                 description: Description of the module
 *               departmentId:
 *                 type: string
 *                 description: ID of the department the module belongs to
 *               level:
 *                 type: string
 *                 description: Education level of the module
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file for the module
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
 *                   description: Success message
 *                 module:
 *                   type: object
 *                   description: Created module details
 *       400:
 *         description: Validation error, such as missing fields
 *       500:
 *         description: Internal server error
 */
router.post("/createmodule", uploadModuleImage, createModule);


export default router;
