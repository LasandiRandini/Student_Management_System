import express from 'express';
import { getDashboardMetrics, searchDepartment, getDepartmentWiseData } from "../controllers/department_controller.js";
import { searchModule } from "../controllers/module_controller.js";

const router = express.Router();

router.get("/dashboardMetrics", getDashboardMetrics);
// router.get("/searchDepartment/:departmentName", searchDepartment);
// router.get("/searchModule/:moduleName", searchModule);
/**
 * @swagger
 * /api/departments/searchDepartment/{departmentName}:
 *   get:
 *     summary: Search for department details including student and course counts
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: departmentName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the department to search
 *     responses:
 *       200:
 *         description: Department details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 department:
 *                   type: string
 *                   description: Department name
 *                 studentCount:
 *                   type: integer
 *                   description: Total number of students in the department
 *                 courseCount:
 *                   type: integer
 *                   description: Total number of courses in the department
 *       404:
 *         description: Department not found
 *       500:
 *         description: Error searching department
 */
router.get("/searchDepartment/:departmentName", searchDepartment);

/**
 * @swagger
 * /api/departments/searchModule/{moduleName}:
 *   get:
 *     summary: Search for module details including student count
 *     tags: [Module]
 *     parameters:
 *       - in: path
 *         name: moduleName
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the module to search
 *     responses:
 *       200:
 *         description: Module details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 module:
 *                   type: string
 *                   description: Module name
 *                 studentCount:
 *                   type: integer
 *                   description: Total number of students in the module
 *       404:
 *         description: Module not found
 *       500:
 *         description: Error searching module
 */
router.get("/searchModule/:moduleName", searchModule);

router.get("/departmentWiseData", getDepartmentWiseData);

export default router;