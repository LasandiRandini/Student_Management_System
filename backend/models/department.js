import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },       
  headOfDepartment: { type: String }, 
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }]                            
});

export const Department = mongoose.model("Department", departmentSchema);
