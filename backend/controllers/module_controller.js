import { Module } from "../models/module.js";
import { Department } from "../models/department.js"; 

export const createModule = async (req, res) => {
  const { name, credits, departmentId, lecturer, level } = req.body;

  try {
  
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

   
    const departmentInitials = department.name
      .split(" ")
      .map(word => word[0].toUpperCase()) 
      .join("");

    // Count total modules in this department and level to use as part of the course code
    const moduleCount = await Module.countDocuments({ department: departmentId, level });

    
    const courseCode = `${departmentInitials}${level}-${String(moduleCount + 1).padStart(3, "0")}`;

   
    const newModule = new Module({
      name,
      credits,
      lecturer,
      level,
      department: department._id,
      courseCode 
    });

   
    await newModule.save();

    
    department.modules.push(newModule._id);
    await department.save();

    // Send the response with the created module
    res.status(201).json(newModule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// export const createModule = async (req, res) => {
//     const { name, credits, departmentId, lecturer, level } = req.body;
  
//     try {
   
//       const department = await Department.findById(departmentId);
//       if (!department) {
//         return res.status(404).json({ error: 'Department not found' });
//       }
  
      
//       const newModule = new Module({
//         name,
//         credits,
//         lecturer,
//         level,
//         department: department._id 
//       });
  
      
//       await newModule.save();
  
     
//       department.modules.push(newModule._id);
//       await department.save(); 
  
//       res.status(201).json(newModule); 
//     } catch (error) {
//       res.status(400).json({ error: error.message }); 
//     }
// };

  
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