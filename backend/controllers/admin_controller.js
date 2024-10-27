
import { Admin } from "../models/admin.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator"; 

import dotenv from "dotenv"; 

dotenv.config(); 

export const aregister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { first_name, last_name, contact_no, email, username, password } = req.body;
  
    try {
      const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
      if (existingAdmin) return res.status(409).json("Admin already exists!");
  
      const hash = await bcrypt.hash(password, 12);
      const newAdmin = new Admin({
        first_name,
        last_name,
        contact_no,
        email,
        username,
        password: hash,
      });
  
      await newAdmin.save();
  
      const token = Jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      const { password: _, ...adminData } = newAdmin._doc;
      res
        .cookie("access_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" })
        .status(200)
        .json({ message: "Admin registered successfully!", admin: adminData });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


  export const alogin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
   
      const admin = await Admin.findOne({ username });
      if (!admin) return res.status(404).json("Admin not found!");
  
  
      
      const isPasswordCorrect = bcrypt.compareSync(password, admin.password);
      if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");
  
      
      const token = Jwt.sign({ id: admin._id }, process.env.JWT_SECRET || "defaultSecretKey", {
        expiresIn: "1h",
      });
  
      const { password: _, ...other } = admin._doc; 
  
      
      res
        .cookie("access_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" }) 
        .status(200)
        .json(other);
    } catch (err) {
      return res.status(500).json({ error: "Something went wrong", details: err.message });
    }
  };
  