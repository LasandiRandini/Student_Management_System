import express from "express"
import { getDepartment,createDepartment  } from "../controllers/department_controller.js"

const router = express.Router();

router.get("/getdepartment", getDepartment);
router.post("/createdepartment", createDepartment);

export default router;