
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import amqp from "amqplib";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerOptions.js";

import departmentRoute from "./routes/department_route.js";
import studentRoute from "./routes/student_route.js";
import moduleRoute from "./routes/module_route.js";
import studentModuleRoute from "./routes/student_module_route.js";
import adminRoute from "./routes/admin_route.js";
import dashboardRoutes from "./routes/dashboard_route.js";
import inquiryRoute from "./routes/inquiry_route.js";
import chatRoute from "./routes/chat_route.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
export const io = new Server(server, { 
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/departments", departmentRoute);
app.use("/api/students", studentRoute);
app.use("/api/modules", moduleRoute);
app.use("/api/student_modules", studentModuleRoute);
app.use("/api/admins", adminRoute);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/inquiries", inquiryRoute);
app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 9090;
const MONGO_URL = process.env.MONGO_URL;


mongoose
  .connect(MONGO_URL, {})
  .then(() => console.log("Database is connected"))
  .catch((err) => {
    console.error(`Error: ${err}`);
    process.exit(1);
  });

  export const loggedInStudents = {}; 
  export let rabbitChannel; 


const setupRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    rabbitChannel = await connection.createChannel();
    console.log("RabbitMQ connected");

    
    await rabbitChannel.assertQueue("chat_messages", { durable: true });
    await rabbitChannel.assertQueue("assessment_reminder", { durable: true });
    await rabbitChannel.assertQueue("exam_result", { durable: true });
    await rabbitChannel.assertQueue("event_reminder", { durable: true });
    await rabbitChannel.assertQueue("undelivered_notifications", { durable: true });

   
    rabbitChannel.consume("chat_messages", (message) => {
      const messageData = JSON.parse(message.content.toString());
      io.emit("receiveMessage", messageData);
      rabbitChannel.ack(message);
    });
    const handleNotification = (queueName, notificationType) => {
      rabbitChannel.consume(queueName, async (message) => {
        if (!message) return;
    
        const notificationData = JSON.parse(message.content.toString());
        const { studentId } = notificationData;
    
        try {
          if (loggedInStudents[studentId]) {
            // User is online
            const socketId = loggedInStudents[studentId];
            io.to(socketId).emit("notification", { type: notificationType, ...notificationData });
            console.log(`Notification sent to logged-in student ${studentId}`);
            rabbitChannel.ack(message); // Acknowledgment
          } else {
           
          //  console.log(`User ${studentId} is offline. Requeuing message.`);
            rabbitChannel.sendToQueue(queueName, Buffer.from(JSON.stringify(notificationData)));
            rabbitChannel.ack(message); // Acknowledge the original message
          }
        } catch (error) {
          console.error(`Error handling notification for ${studentId}:`, error);
       
          rabbitChannel.nack(message, false, true);
        }
      });
    };
    
  
    
    handleNotification("assessment_reminder", "assessment");
    handleNotification("exam_result", "result");
    handleNotification("event_reminder", "event");

   
    connection.on("close", () => {
      console.error("RabbitMQ connection closed. Reconnecting...");
      setTimeout(setupRabbitMQ, 1000);
    });

    connection.on("error", (error) => {
      console.error("RabbitMQ error:", error);
    });
  } catch (error) {
    console.error("Failed to connect to RabbitMQ:", error);
    setTimeout(setupRabbitMQ, 1000);
  }
};



async function processUndeliveredNotifications(studentId) {
  if (!rabbitChannel) {
    console.error("RabbitMQ channel is not available.");
    return;
  }

  const queues = ["assessment_reminder", "exam_result", "event_reminder"];

  try {
    for (const queue of queues) {
      let message;

      do {
        message = await rabbitChannel.get(queue, { noAck: false }); // 1msg at a time
        if (message) {
          const notification = JSON.parse(message.content.toString());

          if (notification.studentId === studentId) {
            const socketId = loggedInStudents[studentId];
            if (socketId) {
              // Send not.via WS
              io.to(socketId).emit("notification", notification);
              console.log(`Delivered queued notification to user ${studentId} from ${queue}:`, notification);
              rabbitChannel.ack(message); // Ack. deliverd
            } else {
              console.log(`Student ${studentId} is  offline.`);
              rabbitChannel.nack(message, false, true); // offline
            }
          } else {
            rabbitChannel.nack(message, false, true); // Requeue 
          }
        }
      } while (message); 
    }
  } catch (error) {
    console.error("Error undelivered notifications:", error);
  }
}



io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("register", async (userId) => {
    if (!userId) {
      console.warn(`Register event received without userId for socket ${socket.id}`);
      return;
    }

    
    loggedInStudents[userId] = socket.id;
    console.log(`User ${userId} registered with socket ID ${socket.id}`);

   
    await processUndeliveredNotifications(userId);
  });

  socket.on("disconnect", () => {
    const userId = Object.keys(loggedInStudents).find((key) => loggedInStudents[key] === socket.id);
    if (userId) {
      delete loggedInStudents[userId];
      console.log(`User ${userId} disconnected`);
    }
  });
});

  


setupRabbitMQ();
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
