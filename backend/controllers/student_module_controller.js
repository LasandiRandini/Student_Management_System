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

    // Check if student is already enrolled in the module
    if (student.modules.includes(moduleId)) {
      return res.status(400).json({ message: "Student is already enrolled in this module." });
    }

    // Add module to student's enrolled modules and student to module's enrolled students
    student.modules.push(moduleId);
    module.students.push(studentId);

    await student.save();
    await module.save();

    res.status(201).json({ message: "Student enrolled in module successfully." });
  } catch (error) {
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
  
      // Remove module from student's enrolled modules and student from module's enrolled students
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
    const { courseCode } = req.query;
  
    try {
      
      if (!courseCode) {
        return res.status(400).json({ message: "Course code is required for search." });
      }
  
    
      const courses = await Module.find({ courseCode: { $regex: courseCode, $options: "i" } }); // Case-insensitive
  
      if (courses.length === 0) {
        return res.status(404).json({ message: "No courses found with the given course code." });
      }
  
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error searching for courses:", error);
      res.status(500).json({ message: "Failed to search for courses.", error });
    }
  };