
import express from "express";
import {
  getDepartment,
  createDepartment,
  getDepartmentById,
  getdepartmentnames,
  deleteDepartment,
  updateDepartment
} from "../controllers/department_controller.js";

const router = express.Router();

router.get("/getdepartment", getDepartment);
/**
 * @swagger
 * /api/departments/createdepartment:
 *   post:
 *     summary: Create a new department
 *     description: This endpoint allows you to create a new department by providing a name and a description. Ensure the `name` is unique and descriptive.
 *     tags: [Department]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The unique name of the department (e.g., "Engineering")
 *               description:
 *                 type: string
 *                 description: A brief description of what the department does (e.g., "Handles all engineering-related tasks")
 *             example:
 *               name: "Human Resources"
 *               description: "Responsible for employee recruitment, training, and welfare"
 *     responses:
 *       201:
 *         description: Department created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 department:
 *                   type: object
 *                   description: Created department details
 *       400:
 *         description: Validation error (e.g., if required fields are missing)
 *       500:
 *         description: Internal server error
 */

router.post("/createdepartment", createDepartment);


router.get("/getdepartmentnames", getdepartmentnames);
router.delete("/deletedepartment/:id", deleteDepartment);
router.put("/updatedepartment/:id", updateDepartment);


export default router;
