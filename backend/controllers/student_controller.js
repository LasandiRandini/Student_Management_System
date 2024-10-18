import { Student } from "../models/student.js"

export const getStudent = async (req, res) => {
 const studentData = await Student.find();
 res.json(studentData);
};
