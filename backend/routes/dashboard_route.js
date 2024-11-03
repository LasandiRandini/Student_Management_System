import express from 'express';
import { getDashboardMetrics, searchDepartment, getDepartmentWiseData } from "../controllers/department_controller.js";
import { searchModule } from "../controllers/module_controller.js";

const router = express.Router();

router.get("/dashboardMetrics", getDashboardMetrics);

/**
 * @swagger
 * /api/departments/searchDepartment/{departmentName}:
 *   get:
 *     summary: Search for department details including student and course counts
 *     description: This endpoint retrieves detailed information about a specific department based on the provided department name. It returns the department's name, the total number of students enrolled, and the number of courses offered. This is particularly useful for administrators and academic staff looking to obtain quick insights into department metrics.
 *     tags: [Department]
 *     parameters:
 *       - in: path
 *         name: departmentName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the department to search for. This parameter is case-sensitive and should match the department's registered name.
 *     responses:
 *       200:
 *         description: Successfully retrieved department details, including the name, total number of students enrolled, and the total number of courses offered by the department.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 department:
 *                   type: string
 *                   description: The name of the department found in the search.
 *                 studentCount:
 *                   type: integer
 *                   description: The total number of students currently enrolled in this department.
 *                 courseCount:
 *                   type: integer
 *                   description: The total number of courses available within this department.
 *       404:
 *         description: The department could not be found in the database.
 *       500:
 *         description: An error occurred while attempting to search for the department.
 */
router.get("/searchDepartment/:departmentName", searchDepartment);

/**
 * @swagger
 * /api/departments/searchModule/{moduleName}:
 *   get:
 *     summary: Search for module details including student count
 *     description: This endpoint retrieves information about a specific module based on the provided module name. It returns the module's name and the total number of students currently enrolled in that module. This is useful for academic staff to track module enrollment and assess student interest in specific courses.
 *     tags: [Module]
 *     parameters:
 *       - in: path
 *         name: moduleName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the module to search for. Ensure the name matches exactly as registered.
 *     responses:
 *       200:
 *         description: Successfully retrieved module details, including the name and total number of students enrolled in the module.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 module:
 *                   type: string
 *                   description: The name of the module found in the search.
 *                 studentCount:
 *                   type: integer
 *                   description: The total number of students currently enrolled in this module.
 *       404:
 *         description: The module could not be found in the database.
 *       500:
 *         description: An error occurred while attempting to search for the module.
 */
router.get("/searchModule/:moduleName", searchModule);

router.get("/departmentWiseData", getDepartmentWiseData);

export default router;