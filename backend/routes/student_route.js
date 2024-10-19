import express from "express"
import { slogin,sregister} from "../controllers/student_controller.js"

const router = express.Router();

router.post("/slogin", slogin);
router.post("/sregister", sregister);

export default router;