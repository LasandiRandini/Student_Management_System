import amqp from "amqplib";
import { Student } from "../models/student.js";


export const submitInquiry = async (req, res) => {
  const { studentId, title, message } = req.body;

  if (!studentId || !title || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    
    const student = await Student.findById(studentId).select('student_code');
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const studentCode = student.student_code;

 
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "inquiryQueue";
    const inquiry = { studentId, student_code: studentCode, title, message, timestamp: new Date() };

    await channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(inquiry)));

    console.log("Inquiry sent to queue:", inquiry);
    res.status(200).json({ message: "Inquiry successfully submitted." });

    
    setTimeout(() => connection.close(), 500);
  } catch (error) {
    console.error("Error processing inquiry:", error);
    res.status(500).json({ error: "Failed to process inquiry" });
  }
};

async function getStudentInfoById(studentId) {
  try {
  
    const student = await Student.findById(studentId).select('first_name last_name student_code');
    return student 
      ? { 
          first_name: student.first_name, 
          last_name: student.last_name, 
          code: student.student_code 
        } 
      : { 
          first_name: "Unknown", 
          last_name: "Unknown", 
          code: "Unknown" 
        };
  } catch (error) {
    console.error("Error fetching student information:", error);
    return { first_name: "Unknown", last_name: "Unknown", code: "Unknown" };
  }
}

export const getInquiries = async (req, res) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "inquiryQueue";
    await channel.assertQueue(queue, { durable: false });

    const inquiries = [];

    let message;
    while ((message = await channel.get(queue, { noAck: true }))) {
      const inquiry = JSON.parse(message.content.toString());

      
      const studentId = inquiry.studentId;

      
      const { first_name, last_name, code: studentCode } = await getStudentInfoById(studentId);

      
      inquiry.first_name = first_name;
      inquiry.last_name = last_name;
      inquiry.student_code = studentCode;

      inquiries.push(inquiry);
    }

    setTimeout(() => connection.close(), 6000);

    res.status(200).json({ notifications: inquiries });
  } catch (error) {
    console.error("Error fetching inquiries from RabbitMQ:", error);
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
};


