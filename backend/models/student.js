import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  birth_day: { type: Date, required: true },
  contact_no: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  level: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  student_code: { type: String, unique: true },
  
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }]
});

export const Student = mongoose.model("Student", studentSchema);
