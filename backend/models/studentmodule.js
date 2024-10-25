
import mongoose from "mongoose";

const StudentModuleSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  moduleId: { type: String, required: true }, 
});

export default mongoose.model("StudentModule", StudentModuleSchema);
