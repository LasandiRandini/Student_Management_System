import express from "express"
import { createDepartment } from "../controllers/department_controller.js"

const router = express.Router();

router.post("/department", createDepartment);

export default router;