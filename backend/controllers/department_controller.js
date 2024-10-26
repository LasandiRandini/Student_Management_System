import { Department } from "../models/department.js"
import { Student } from "../models/student.js";
import { Module } from "../models/module.js";
  
export const createDepartment = async (req, res) => {
  const { name, headOfDepartment } = req.body;

  
  if (!name || !headOfDepartment) {
    return res.status(400).json({ error: 'Name and Head of Department are required.' });
  }

  try {
    const newDepartment = new Department({ name, headOfDepartment });
    await newDepartment.save();
    res.status(201).json(newDepartment); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getDepartment = async (req, res) => {
  try {
    const departments = await Department.find(); 
    res.status(200).json(departments); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


export const getdepartmentnames = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve departments' });
  }
};




// Get total counts for departments, students, and modules
export const getDashboardMetrics = async (req, res) => {
  try {
    const totalDepartments = await Department.countDocuments();
    const totalStudents = await Student.countDocuments();
    const totalModules = await Module.countDocuments();
    
    res.json({
      totalDepartments,
      totalStudents,
      totalModules,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching dashboard metrics" });
  }
};

// Search for department details, including student and course counts
export const searchDepartment = async (req, res) => {
  try {
    const { departmentName } = req.params;
    const department = await Department.findOne({ name: departmentName }).populate("modules");

    if (!department) return res.status(404).json({ error: "Department not found" });

    const studentCount = await Student.countDocuments({ department: departmentName });
    const courseCount = department.modules.length;

    res.json({
      department: department.name,
      studentCount,
      courseCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Error searching department" });
  }
};