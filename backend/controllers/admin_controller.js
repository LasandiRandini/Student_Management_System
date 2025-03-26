

import { Admin } from "../models/admin.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

import { loggedInStudents, rabbitChannel, io } from "../app.js"; 



export async function sendNotification(queue, message, studentId) {
  if (loggedInStudents[studentId]) {
   
    const socketId = loggedInStudents[studentId];
    io.to(socketId).emit("notification", message);
    console.log(`Sent real-time notification to user ${studentId}:`, message);
  } else {
    
    if (!rabbitChannel) {
      console.error("RabbitMQ channel is not available.");
      return;
    }

    try {
      await rabbitChannel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify({ studentId, ...message }))
      );
      console.log(`Enqueued notification for user ${studentId} in ${queue}:`, message);
    } catch (error) {
      console.error(`Failed to enqueue message for ${queue}:`, error);
    }
  }
}

export async function sendAssessmentReminder(req, res) {
  const { studentIds, message } = req.body; 

  if (!Array.isArray(studentIds) || studentIds.length === 0) {
    return res.status(400).json({ error: "No student IDs provided or invalid format" });
  }

  const notificationMessage = {
    type: "assessment",
    text: message || "Assessment is due soon!",
    link: "/assignments",
  };

  try {
    await Promise.all(
      studentIds.map((studentId) =>
        sendNotification("assessment_reminder", notificationMessage, studentId)
      )
    );
    res.status(200).json({ success: true, message: "Assessment reminders sent!" });
  } catch (error) {
    console.error("Error sending assessment reminders:", error);
    res.status(500).json({ error: "Failed to send assessment reminders" });
  }
}


export async function sendExamResult(req, res) {
  const { studentIds, message } = req.body;

  if (!studentIds || studentIds.length === 0) {
    return res.status(400).json({ error: "No student IDs provided" });
  }

  const notificationMessage = {
    type: "result",
    text: message || "Your exam results are out!",
    link: "/results",
  };

  try {
    await Promise.all(
      studentIds.map((studentId) =>
        sendNotification("exam_result", notificationMessage, studentId)
      )
    );
    res.status(200).json({ success: true, message: "Exam result notifications sent!" });
  } catch (error) {
    console.error("Error sending exam results:", error);
    res.status(500).json({ error: "Failed to send exam result notifications" });
  }
}


export async function sendEventReminder(req, res) {
  const { studentIds, message } = req.body;

  if (!studentIds || studentIds.length === 0) {
    return res.status(400).json({ error: "No student IDs provided" });
  }

  const notificationMessage = {
    type: "event",
    text: message || "Upcoming event reminder!",
    link: "/events",
  };

  try {
    await Promise.all(
      studentIds.map((studentId) =>
        sendNotification("event_reminder", notificationMessage, studentId)
      )
    );
    res.status(200).json({ success: true, message: "Event reminders sent!" });
  } catch (error) {
    console.error("Error sending event reminders:", error);
    res.status(500).json({ error: "Failed to send event reminders" });
  }
}
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

