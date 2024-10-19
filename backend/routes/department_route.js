import express from "express"
import { getDepartment,createDepartment, getDepartmentById } from "../controllers/department_controller.js"

const router = express.Router();

router.get("/getdepartment", getDepartment);
router.post("/createdepartment", createDepartment);
router.get("/getdepname/:id", getDepartmentById);

export default router;