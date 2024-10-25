import { Department } from "../models/department.js"
  
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