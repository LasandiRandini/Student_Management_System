import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  
  contact_no: { type: String, required: true },
  email: { type: String, required: true },
 
  username: { type: String, required: true },
  password: { type: String, required: true },
 
  
 
});

export const Admin = mongoose.model("Admin", adminSchema);
