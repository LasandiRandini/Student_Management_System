
import Message from "../models/message.js";

import { Student } from "../models/student.js";

export const sendMessage = async (req, res) => {
  try {
    console.log("Received message data in backend:", req.body);
    const { sender, recipient, content } = req.body;
    const newMessage = new Message({ sender, recipient, content });
    await newMessage.save();

    res.status(201).json({ success: true, message: "Message sent successfully", data: newMessage });
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { sender, recipient } = req.params;

    const messages = await Message.find({
      $or: [
        { sender, recipient },
        { sender: recipient, recipient: sender },
      ],
    }).sort({ timestamp: 1 });

    
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve messages", error: error.message });
  }
};


export const markMessagesAsRead = async (req, res) => {
  try {
    const { sender, recipient } = req.body;

    await Message.updateMany(
      { sender, recipient, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ success: true, message: "Messages marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to mark messages as read", error: error.message });
  }
};


export const getStudentsWithMessages = async (req, res) => {
  try {
    const adminId = req.user._id; 

    
    const studentIds = await Chat.distinct("studentId", { adminId });

    const students = await Student.find({ _id: { $in: studentIds } }).select("first_name last_name _id");

    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students with messages" });
  }
};