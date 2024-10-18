import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },       
  headOfDepartment: { type: String },                             
});

export const Department = mongoose.model("department", departmentSchema);
