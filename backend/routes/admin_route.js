import express from "express"
import { alogin,aregister} from "../controllers/admin_controller.js"

const router = express.Router();

router.post("/alogin", alogin);
router.post("/aregister", aregister);


export default router;