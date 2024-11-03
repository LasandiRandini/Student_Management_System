import { Student } from "../models/student.js";
import { Module } from "../models/module.js";


export const enrollStudentInModule = async (req, res) => {
  const { studentId, moduleId } = req.body;  

  try {
    const student = await Student.findById(studentId);
    const module = await Module.findById(moduleId);  

    if (!student || !module) {
      return res.status(404).json({ message: "Student or Module not found." });
    }

    if (student.modules.includes(module._id)) {
      return res.status(400).json({ message: "Student is already enrolled in this module." });
    }

    student.modules.push(module._id);
    module.students.push(student._id);
    console.log('Student ID:', studentId);
    console.log('Module ID:', moduleId);
    await student.save();
    await module.save();

    res.status(201).json({ message: "Student enrolled in module successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to enroll student in module.", error });
  }
};

export const getStudentModules = async (req, res) => {
    const { studentId } = req.params;
  
    try {
      const student = await Student.findById(studentId).populate("modules");
      if (!student) {
        return res.status(404).json({ message: "Student not found." });
      }
  
      res.status(200).json(student.modules);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch student modules.", error });
    }
  };

  export const unenrollStudentFromModule = async (req, res) => {
    const { studentId, moduleId } = req.params;
  
    try {
      const student = await Student.findById(studentId);
      const module = await Module.findById(moduleId);
  
      if (!student || !module) {
        return res.status(404).json({ message: "Student or Module not found." });
      }
  

      student.modules.pull(moduleId);
      module.students.pull(studentId);
  
      await student.save();
      await module.save();
  
      res.status(200).json({ message: "Student unenrolled from module successfully." });
    } catch (error) {
      res.status(500).json({ message: "Failed to unenroll student from module.", error });
    }
  };
 
  
export const searchCourses = async (req, res) => {
    const { courseCode, departmentId, level } = req.query;
  
    try {
      if (!courseCode) {
        return res.status(400).json({ message: "Course code is required for search." });
      }
  
      const query = {
        courseCode: { $regex: courseCode, $options: "i" } 
      };
  
      
      if (departmentId) {
        try {
          query.department = mongoose.Types.ObjectId(departmentId);
        } catch (err) {
          return res.status(400).json({ message: "Invalid department ID format." });
        }
      }
  
      
      if (level) {
        query.level = level;
      }
  
      
      const courses = await Module.find(query);
  
      
      if (courses.length === 0) {
        return res.status(404).json({ message: "No courses found with the given search criteria." });
      }
  
      
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error searching for courses:", error);
      res.status(500).json({ message: "Failed to search for courses.", error });
    }
  };

  
export const getStudentsByModule = async (req, res) => {
  const { moduleId } = req.params;

  try {
   
    const module = await Module.findById(moduleId).populate("students", "first_name last_name contact_no email");

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    res.json(module.students);
  } catch (error) {
    res.status(500).json({ error: "Error fetching students for the module" });
  }
};