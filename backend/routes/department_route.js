// import express from "express"
// import { getDepartment,createDepartment, getDepartmentById,getdepartmentnames } from "../controllers/department_controller.js"

// const router = express.Router();

// router.get("/getdepartment", getDepartment);
// router.post("/createdepartment", createDepartment);
// router.get("/getdepname/:id", getDepartmentById);
// router.get("/getdepartmentnames", getdepartmentnames);

// export default router;

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
 *                 description: Name of the department
 *               description:
 *                 type: string
 *                 description: Description of the department
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
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/createdepartment", createDepartment);


router.get("/getdepartmentnames", getdepartmentnames);
router.delete("/deletedepartment/:id", deleteDepartment);
router.put("/updatedepartment/:id", updateDepartment);


export default router;
