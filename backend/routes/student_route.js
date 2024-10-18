import express from "express"
import { getStudent } from "../controllers/student_controller.js"

const router = express.Router();

router.get("/getstudent", getStudent);

export default router;