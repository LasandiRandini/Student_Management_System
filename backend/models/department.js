import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

export const Department = mongoose.model("Department", departmentSchema);