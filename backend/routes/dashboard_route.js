import express from 'express';
import { getDashboardMetrics, searchDepartment } from "../controllers/department_controller.js";
import { searchModule } from "../controllers/module_controller.js";

const router = express.Router();

router.get("/dashboardMetrics", getDashboardMetrics);
router.get("/searchDepartment/:departmentName", searchDepartment);
router.get("/searchModule/:moduleName", searchModule);

export default router;