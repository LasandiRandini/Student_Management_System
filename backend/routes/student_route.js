import express from "express"
import { slogin,sregister, getStudent, verifyStudent, getStudentWithModules} from "../controllers/student_controller.js"

const router = express.Router();


router.get("/getStudent", getStudent);



/**
 * @swagger
 * /api/students/slogin:
 *   post:
 *     summary: Student login
 *     description: Allows a registered student to log in by providing their `username` and `password`. Upon successful authentication, a token is returned that can be used for accessing protected resources. Ensure the credentials are valid and match an existing student account.
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
 *                 description: Username of the student (e.g., "john_doe123")
 *               password:
 *                 type: string
 *                 description: Password of the student (e.g., "securepassword123")
 *             example:
 *               username: "john_doe123"
 *               password: "securepassword123"
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
 *                   description: Username of the logged-in student
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated sessions
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
 *     description: This endpoint registers a new student by accepting details such as `firstName`, `lastName`, `contactNumber`, `email`, `username`, and `password`. Ensure that the `username` and `email` provided are unique.
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
 *                 description: First name of the student (e.g., "John")
 *               lastName:
 *                 type: string
 *                 description: Last name of the student (e.g., "Doe")
 *               contactNumber:
 *                 type: string
 *                 description: Contact number of the student (e.g., "+123456789")
 *               email:
 *                 type: string
 *                 description: Email address of the student (e.g., "john.doe@example.com")
 *               username:
 *                 type: string
 *                 description: Unique username for the student (e.g., "john_doe123")
 *               password:
 *                 type: string
 *                 description: Password for the student (e.g., "securepassword123")
 *             example:
 *               firstName: "John"
 *               lastName: "Doe"
 *               contactNumber: "+123456789"
 *               email: "john.doe@example.com"
 *               username: "john_doe123"
 *               password: "securepassword123"
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
 *                   description: Success message indicating registration completion
 *                 student:
 *                   type: object
 *                   description: Details of the registered student
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
 *     description: Verifies a student account using their unique `id`. This is typically used to confirm the student's registration or activate their account.
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The unique ID of the student to verify (e.g., "12345")
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


