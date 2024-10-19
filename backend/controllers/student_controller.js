

import { Student } from "../models/student.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator"; // Import express-validator

// Validation middleware
export const validateStudent = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  // Add more validations as needed
];

export const sregister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, last_name, birth_day, contact_no, email, department, level, username, password } = req.body;

  try {
    const existingStudent = await Student.findOne({ $or: [{ email }, { username }] });
    if (existingStudent) return res.status(409).json("Student already exists!");

    const hash = await bcrypt.hash(password, 12); // Higher salt rounds
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
    });

    await newStudent.save();
    const token = Jwt.sign({ id: newStudent._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    const { password: _, ...studentData } = newStudent._doc; 
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ message: "Student registered successfully!", student: studentData });
  } catch (err) {
    console.error(err); // Log the error
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const slogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query for student by username
    const student = await Student.findOne({ username });
    if (!student) return res.status(404).json("Student not found!");

    // Check if the student is verified
    if (!student.isVerified) {
      return res.status(403).json("Your account is not verified yet.");
    }
    // Check if the password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, student.password);
    if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

    // Generate JWT token
    const token = Jwt.sign({ id: student._id }, "jwkey");
    const { password: _, ...other } = student._doc; // Exclude the password from the response

    // Send token as HTTP-only cookie and return student data
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(other);
  } catch (err) {
    return res.status(500).json(err);
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