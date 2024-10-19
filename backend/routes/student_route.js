import express from "express"
import { slogin,sregister, getStudent, verifyStudent} from "../controllers/student_controller.js"

const router = express.Router();

router.post("/slogin", slogin);
router.post("/sregister", sregister);
router.get("/getStudent", getStudent);
router.put("/verify/:id", verifyStudent);

export default router;