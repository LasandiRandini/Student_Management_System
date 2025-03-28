import express from "express";
import { enrollStudentInModule, getStudentModules, unenrollStudentFromModule ,searchCourses, getStudentsByModule } from "../controllers/student_module_controller.js";

const router = express.Router();

router.post("/enroll", enrollStudentInModule);
router.get("/:studentId/modules", getStudentModules);
router.delete("/:studentId/unenroll/:moduleId", unenrollStudentFromModule);
router.get("/search", searchCourses);




router.get("/:moduleId/students", getStudentsByModule);

export default router;

