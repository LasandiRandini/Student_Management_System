// import mongoose from 'mongoose';

// const moduleSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   credits: { type: Number },
//   lecturer: { type: String },
//   level: { type: String },
//   department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
// });

// export const Module = mongoose.model('Module', moduleSchema);

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
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

export const Module = mongoose.model("Module", moduleSchema);
