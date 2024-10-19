import { Module } from "../models/module.js";
import { Department } from "../models/department.js"; 


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
//         department: department._id // Link the module to the department
//       });
  
//       // Save the module to the database
//       await newModule.save();
  
//       // Add the module ID to the department's courses array (or modules)
//       department.courses.push(newModule._id);
//       await department.save(); // Save the updated department
  
//       res.status(201).json(newModule); // Respond with the newly created module
//     } catch (error) {
//       res.status(400).json({ error: error.message }); // Handle errors
//     }
//   };

export const createModule = async (req, res) => {
    const { name, credits, departmentId, lecturer, level } = req.body;
  
    try {
   
      const department = await Department.findById(departmentId);
      if (!department) {
        return res.status(404).json({ error: 'Department not found' });
      }
  
      
      const newModule = new Module({
        name,
        credits,
        lecturer,
        level,
        department: department._id 
      });
  
      
      await newModule.save();
  
     
      department.modules.push(newModule._id);
      await department.save(); 
  
      res.status(201).json(newModule); 
    } catch (error) {
      res.status(400).json({ error: error.message }); 
    }
};

// export const getModule = async (req, res) => {
//     const { departmentId, level } = req.params; 
  
//     try {
     
//       const modules = await Module.find({ departmentId, level }).populate('department'); 
//       res.status(200).json(modules); 
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   }
//   export const getModule = async (req, res) => {
//     const { departmentId, level } = req.params;
  
//     try {
      
//       const modules = await Module.find({ department: departmentId, level: level }).populate('department');
//       res.status(200).json(modules);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };
  
export const getModule = async (req, res) => {
    const { departmentId, level } = req.params;
  
    console.log("Department ID:", departmentId, "Level:", level); // Debugging
  
    try {
      const modules = await Module.find({ department: departmentId, level: level }).populate('department');
      res.status(200).json(modules);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };