import { Module } from "../models/module.js";
import { Department } from "../models/department.js";

import multer from "multer";
import path from "path";

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
export const uploadModuleImage = upload.single('image');

// Create a new module
export const createModule = async (req, res) => {
  const { name, credits, departmentId, lecturer, level } = req.body;
  const imagePath = req.file ? req.file.path : null;

  try {
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    const departmentInitials = department.name
      .split(" ")
      .map(word => word[0].toUpperCase())
      .join("");

    const moduleCount = await Module.countDocuments({ department: departmentId, level });
    const courseCode = `${departmentInitials}${level}-${String(moduleCount + 1).padStart(3, "0")}`;

    const newModule = new Module({
      name,
      credits,
      lecturer,
      level,
      department: department._id,
      courseCode,
      image: imagePath
    });

    await newModule.save();
    department.modules.push(newModule._id);
    await department.save();

    res.status(201).json(newModule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


  
export const getModule = async (req, res) => {
    const { departmentId, level } = req.params;
  
    console.log("Department ID:", departmentId, "Level:", level); 
  
    try {
      const modules = await Module.find({ department: departmentId, level: level }).populate('department');
      res.status(200).json(modules);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


 

  export const searchModule = async (req, res) => {
    try {
      const { moduleName } = req.params;
      const module = await Module.findOne({ name: moduleName }).populate("students");
  
      if (!module) return res.status(404).json({ error: "Module not found" });
  
      const studentCount = module.students.length;
  
      res.json({
        module: module.name,
        studentCount,
      });
    } catch (error) {
      res.status(500).json({ error: "Error searching module" });
    }
  };