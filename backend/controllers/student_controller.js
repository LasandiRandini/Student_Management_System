

import { Student } from "../models/student.js";
import { Department } from "../models/department.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator"; 

import dotenv from "dotenv"; 

dotenv.config(); 


export const validateStudent = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  
];



export const slogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const student = await Student.findOne({ username });
    if (!student) return res.status(404).json("Student not found!");
    
    if (!student.isVerified) {
      return res.status(403).json("Your account is not verified yet.");
    }
    // console.log("Student:", student);

    const isPasswordCorrect = bcrypt.compareSync(password, student.password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

    
    
    const token = Jwt.sign({ id: student._id }, process.env.JWT_SECRET || "defaultSecretKey", {
      expiresIn: "1h",
    });
    if (!token) {
      return res.status(500).json("Failed to generate token");
    }

    const { password: _, ...other } = student._doc;

    res
      .cookie("access_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
      .status(200)
      .json(other);
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ error: "Something went wrong", details: err.message });
  }
};


export const getStudent = async (req, res) => {
  try {
    const students = await Student.find().populate('modules');
    if (!students || students.length === 0) {
      return res.status(404).json({ message: 'No students found' });
    } 
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const verifyStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.isVerified = true;
    await student.save();

    res.json({ message: 'Student verified successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



function generateStudentCode() {
  const prefix = "STU";
  const randomNumber = Math.floor(1000 + Math.random() * 9000); 
  return `${prefix}-${randomNumber}-${Date.now().toString().slice(-4)}`; //  STU-1234-5678
}

export const sregister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, last_name, birth_day, contact_no, email, department, level, username, password } = req.body;

  try {
   
    const existingStudent = await Student.findOne({ $or: [{ email }, { username }] });
    if (existingStudent) return res.status(409).json("Student already exists!");

    
    const studentCode = generateStudentCode();

    
    const hash = await bcrypt.hash(password, 12);

   
    const newStudent = new Student({
      first_name,
      last_name,
      birth_day,
      contact_no,
      email,
      department,
      level,
      username,
      password: hash,
      student_code: studentCode,
    });

    await newStudent.save();

    
    const token = Jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    
    const { password: _, ...studentData } = newStudent._doc;

    res
      .cookie("access_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
      .status(200)
      .json({ message: "Student registered successfully!", student: studentData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const getStudentWithModules = async (req, res) => {
  const studentId = req.params.id;
  
  try {
    const student = await Student.findById(studentId).populate({
      path: 'modules', 
      select: 'name credits level courseCode lecturer' 
    });
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student with modules", error });
  }
};

// export const getStudentsByDepartmentAndLevel = async (req, res) => {
//   const { departmentId, level } = req.params;

//   try {
//     // Step 1: Fetch the department name using the department ID
//     const department = await Department.findById(departmentId);
//     if (!department) {
//       return res.status(404).json({ error: "Department not found" });
//     }

//     const departmentName = department.name;

//     // Step 2: Fetch students based on the department name and level
//     const students = await Student.find({ department: departmentName, level }, "_id");
//     const studentIds = students.map((student) => student._id);

//     // Step 3: Return the student IDs
//     res.status(200).json(studentIds);
//   } catch (error) {
//     console.error("Error fetching students:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
export const getStudentsByDepartmentAndLevel = async (req, res) => {
  console.log("Request Params:", req.params); // Debug log

  const { departmentId, level } = req.params;

  if (!departmentId) {
    console.log("Error: departmentId is undefined");
    return res.status(400).json({ error: "departmentId is required" });
  }

  if (!level) {
    console.log("Error: level is undefined");
    return res.status(400).json({ error: "level is required" });
  }

  try {
    const department = await Department.findById(departmentId);
    if (!department) {
      console.log("Department not found for ID:", departmentId); // Debug log
      return res.status(404).json({ error: "Department not found" });
    }

    const departmentName = department.name;
    console.log("Found department:", departmentName); // Debug log

    const students = await Student.find({ department: departmentName, level }, "_id");
    const studentIds = students.map((student) => student._id);

    res.status(200).json(studentIds);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
