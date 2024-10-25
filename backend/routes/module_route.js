

import express from "express";
import { createModule, getModule } from "../controllers/module_controller.js";

const router = express.Router();

// router.get("/getmodule/:departmentId/:level", getModule);
router.get("/getmodule/:departmentId/:level", getModule);


router.post("/createmodule", createModule);

export default router;
