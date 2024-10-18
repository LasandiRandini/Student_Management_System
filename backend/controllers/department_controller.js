import { Department } from "../models/department.js"

export const getDepartment = async (req, res) => {

 const departmentData = await Department.find();
 res.json(departmentData);
};

// export const createDepartment = async (req, res) => {
//   const {name,headOfDepartment } = req.body;
//   try {
//     const newDepartment = new Department({ name,headOfDepartment });
//     await newDepartment.save(); 
//     res.status(201).json(newDepartment);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// export const createDepartment = async (req, res) => {
//     const { name, headOfDepartment } = req.body;
  
//     // Basic validation to check if required fields are present
//     if (!name || !headOfDepartment) {
//       return res.status(400).json({ error: 'Name and Head of Department are required.' });
//     }
  
//     try {
//       const newDepartment = new Department({ name, headOfDepartment });
//       await newDepartment.save(); // Save the new department to the database
//       res.status(201).json(newDepartment); // Return the created department
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   };

export const createDepartment = async (req, res) => {
    const departments = [
      { name: "Computer Science", headOfDepartment: "Dr. John Doe" },
      { name: "Mathematics", headOfDepartment: "Dr. Jane Doe" },
      { name: "Physics", headOfDepartment: "Dr. James Doe" }
    ];
  
    try {
      // Insert multiple departments into the database
      const newDepartments = await Department.insertMany(departments);
  
      // Respond with the inserted departments
      res.status(201).json(newDepartments);
    } catch (error) {
      // Handle any error that occurs during insertion
      res.status(400).json({ error: error.message });
    }
  };
  