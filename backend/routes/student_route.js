import express from "express"
import { slogin,sregister, getStudent, verifyStudent, getStudentWithModules} from "../controllers/student_controller.js"

const router = express.Router();


router.get("/getStudent", getStudent);



/**
 * @swagger
 * /api/students/slogin:
 *   post:
 *     summary: Student login
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the student
 *               password:
 *                 type: string
 *                 description: Password of the student
 *     responses:
 *       200:
 *         description: Student logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Incorrect username or password
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.post("/slogin", slogin);

/**
 * @swagger
 * /api/students/sregister:
 *   post:
 *     summary: Register a new student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 student:
 *                   type: object
 *       400:
 *         description: Validation error or missing fields
 *       409:
 *         description: Student already exists
 *       500:
 *         description: Internal server error
 */
router.post("/sregister", sregister);

/**
 * @swagger
 * /api/students/verify/{id}:
 *   put:
 *     summary: Verify a student by ID
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the student to verify
 *     responses:
 *       200:
 *         description: Student verified successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.put("/verify/:id", verifyStudent);

router.get('/:id/modules', getStudentWithModules);
export default router;


