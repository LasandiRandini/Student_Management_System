

import express from "express";
import { createModule, getModule ,uploadModuleImage} from "../controllers/module_controller.js";

const router = express.Router();

// router.get("/getmodule/:departmentId/:level", getModule);
router.get("/getmodule/:departmentId/:level", getModule);


router.post("/createmodule", uploadModuleImage, createModule);

export default router;
