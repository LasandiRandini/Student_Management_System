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
} from "../controllers/department_controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/departments/getdepartment:
 *   get:
 *     summary: Retrieve a list of departments
 *     description: Retrieve all department details from the database.
 *     responses:
 *       200:
 *         description: A list of departments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get("/getdepartment", getDepartment);

/**
 * @swagger
 * /api/departments/createdepartment:
 *   post:
 *     summary: Create a new department
 *     description: Add a new department to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Department created successfully.
 *       400:
 *         description: Bad request, invalid input.
 */
router.post("/createdepartment", createDepartment);

/**
 * @swagger
 * /api/departments/getdepname/{id}:
 *   get:
 *     summary: Get a department by ID
 *     description: Retrieve a specific department by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The department ID
 *     responses:
 *       200:
 *         description: Department found.
 *       404:
 *         description: Department not found.
 */
router.get("/getdepname/:id", getDepartmentById);

/**
 * @swagger
 * /api/departments/getdepartmentnames:
 *   get:
 *     summary: Retrieve department names
 *     description: Retrieve only the names of all departments.
 *     responses:
 *       200:
 *         description: A list of department names.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get("/getdepartmentnames", getdepartmentnames);

export default router;
