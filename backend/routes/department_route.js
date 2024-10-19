import express from "express"
import { getDepartment,createDepartment, getDepartmentById,getdepartmentnames } from "../controllers/department_controller.js"

const router = express.Router();

router.get("/getdepartment", getDepartment);
router.post("/createdepartment", createDepartment);
router.get("/getdepname/:id", getDepartmentById);
router.get("/getdepartmentnames", getdepartmentnames);

export default router;