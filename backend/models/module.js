import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  credits: {
    type: Number,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  lecturer: {
    type: String,
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
  image: { 
    type: String, 
    required: false,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

export const Module = mongoose.model("Module", moduleSchema);
