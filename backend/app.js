// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import http from "http";
// import amqp from "amqplib";
// import { Server } from "socket.io";
// import swaggerUi from "swagger-ui-express";
// import { swaggerSpec } from "./swaggerOptions.js";

// import departmentRoute from "./routes/department_route.js";
// import studentRoute from "./routes/student_route.js";
// import moduleRoute from "./routes/module_route.js";
// import studentModuleRoute from "./routes/student_module_route.js";
// import adminRoute from "./routes/admin_route.js";
// import dashboardRoutes from "./routes/dashboard_route.js";
// import inquiryRoute from "./routes/inquiry_route.js";
// import chatRoute from "./routes/chat_route.js";

// import Message from "./models/message.js";

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());
// app.use("/uploads", express.static("uploads"));

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use("/api/departments", departmentRoute);
// app.use("/api/students", studentRoute);
// app.use("/api/modules", moduleRoute);
// app.use("/api/student_modules", studentModuleRoute);
// app.use("/api/admins", adminRoute);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/inquiries", inquiryRoute);
// app.use("/api/chat", chatRoute);

// const PORT = process.env.PORT || 9090;
// const MONGO_URL = process.env.MONGO_URL;

// mongoose.connect(MONGO_URL, {}).then(() => console.log("Database is connected")).catch((err) => {
//   console.error(`Error: ${err}`);
//   process.exit(1);
// });

// let rabbitChannel;
// const userSockets = {};

// // RabbitMQ Setup with Retry Logic
// const setupRabbitMQ = async () => {
//   try {
//     const connection = await amqp.connect("amqp://localhost");
//     rabbitChannel = await connection.createChannel();
//     await rabbitChannel.assertQueue("chat_messages");
//     console.log("RabbitMQ connected");

//         // Consume messages from RabbitMQ and broadcast them to all connected users
//         rabbitChannel.consume("chat_messages", (message) => {
//           const messageData = JSON.parse(message.content.toString());
//           io.emit("receiveMessage", messageData);
//           rabbitChannel.ack(message);
//         });

//     connection.on("close", () => {
//       console.error("RabbitMQ connection closed. Reconnecting...");
//       setTimeout(setupRabbitMQ, 1000);
//     });

//     connection.on("error", (error) => {
//       console.error("RabbitMQ error:", error);
//     });
//   } catch (error) {
//     console.error("Failed to connect to RabbitMQ:", error);
//     setTimeout(setupRabbitMQ, 1000);
//   }
// };

// setupRabbitMQ();

// // Socket.io Setup
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   // Increase the registration timeout to allow more time for the frontend to register
//   // const registrationTimeout = setTimeout(() => {
//   //   if (!socket.userId) {
//   //     console.warn(`Socket ${socket.id} did not register. Disconnecting...`);
//   //     socket.disconnect(true);
//   //   }
//   // }, 90000); // 20 seconds

//   // Handle user registration
//   // socket.on("register", (userId) => {
//   //   console.log(`Register event received with userId: ${userId} for socket: ${socket.id}`); // Added log
//   //   if (userId) {
//   //     clearTimeout(registrationTimeout);
//   //     socket.userId = userId;
//   //     userSockets[userId] = socket.id;
//   //     console.log(`User ${userId} registered with socket ID ${socket.id}`);
//   //     console.log("Current userSockets:", userSockets);
//   //   } else {
//   //     console.warn(`Register event received without userId for socket ${socket.id}`);
//   //   }
//   // });
//   socket.on("register", (userId) => {
//     userSockets[userId] = socket.id;
//     console.log(`User ${userId} registered with socket ID ${socket.id}`);
//   });

//   // // Handle disconnection
//   // socket.on("disconnect", () => {
//   //   if (socket.userId && userSockets[socket.userId] === socket.id) {
//   //     delete userSockets[socket.userId];
//   //     console.log(`User ${socket.userId} disconnected and removed from userSockets`);
//   //   } else {
//   //     console.warn(`Socket ${socket.id} disconnected without registering.`);
//   //   }
//   //   console.log("Current userSockets after disconnect:", userSockets);
//   // });
//   socket.on("disconnect", () => {
//     for (const [userId, socketId] of Object.entries(userSockets)) {
//       if (socketId === socket.id) {
//         delete userSockets[userId];
//         break;
//       }
//     }})

//   // Handle sending messages
//   socket.on("sendMessage", async (messageData) => {

//     console.log(`Received message from ${messageData.sender}: ${messageData.content}`);
//     // Publish message to RabbitMQ
//     rabbitChannel.sendToQueue("chat_messages", Buffer.from(JSON.stringify(messageData)));


//     // const { sender, recipient, content } = messageData;
//     // const recipientSocketId = userSockets[recipient];

//     // console.log("Attempting to send message from:", sender, "to:", recipient);
//     // console.log("Recipient socket ID:", recipientSocketId);

//     // try {
//     //   // Publish the message to RabbitMQ
//     //   await rabbitChannel.sendToQueue("chat_messages", Buffer.from(JSON.stringify(messageData)));
//     //   console.log("Message published to RabbitMQ");

//     //   if (recipientSocketId) {
//     //     // Send message to the recipient if they are online
//     //     io.to(recipientSocketId).emit("receiveMessage", messageData);
//     //     console.log(`Message sent from ${sender} to ${recipient}`);
//     //   } else {
//     //     console.warn(`Recipient ${recipient} is not online or not registered with a socket ID.`);
//     //   }
//     // } catch (error) {
//     //   console.error("Error sending message:", error);
//     // }
//   });

  
// });

// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


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

import Message from "./models/message.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
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
  .connect(MONGO_URL, { })
  .then(() => console.log("Database is connected"))
  .catch((err) => {
    console.error(`Error: ${err}`);
    process.exit(1);
  });

let rabbitChannel;
const userSockets = {}; 

// RabbitMQ Setup
const setupRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    rabbitChannel = await connection.createChannel();
    console.log("RabbitMQ connected");
    
        // Consume messages from RabbitMQ and broadcast them to all connected users
        rabbitChannel.consume("chat_messages", (message) => {
          const messageData = JSON.parse(message.content.toString());
          io.emit("receiveMessage", messageData);
          rabbitChannel.ack(message);
        });

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

setupRabbitMQ();

// Socket.io Setup
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Set a timeout for registration
  // const registrationTimeout = setTimeout(() => {
  //   if (!socket.userId) {
  //     console.warn(`Socket ${socket.id} did not register within the allowed time. Disconnecting...`);
  //     socket.disconnect(true);
  //   }
  // }, 20000); // Disconnect after 5 seconds if not registered

  // Handle the 'register' event to associate userId with socket
  socket.on("register", async (userId) => {
    if (!userId) {
      console.warn(`Register event received without userId for socket ${socket.id}`);
      return;
    }

    // clearTimeout(registrationTimeout); // Clear the timeout as the user has registered

    // Associate the userId with the socket
    socket.userId = userId;
    userSockets[userId] = socket.id;
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    if (socket.userId) {
      console.log(`User disconnected: ${socket.id}, User ID: ${socket.userId}`);
      // Ensure we remove only the socket ID associated with this userId
      if (userSockets[socket.userId] === socket.id) {
        delete userSockets[socket.userId];
      }
    } else {
      console.warn(`Socket disconnected without user ID: ${socket.id}`);
    }
  });

  // Handle sending messages
  // socket.on("sendMessage", async (messageData) => {
  //   const { sender, recipient, content } = messageData;
  //   const recipientSocketId = userSockets[recipient];

  //   if (recipientSocketId) {
  //     // If recipient is online, send the message
  //     io.to(recipientSocketId).emit("receiveMessage", messageData);
  //     console.log(`Message sent from ${sender} to ${recipient} (Socket ID: ${recipientSocketId})`);
  //   } else {
  //     console.warn(`Recipient ${recipient} is not online or not registered with a socket ID.`);
      
  //     // Optional: Store the message in RabbitMQ or a database for offline delivery
  //   }
  // });

    // Handle sending messages
  socket.on("sendMessage", async (messageData) => {

    console.log(`Received message from ${messageData.sender}: ${messageData.content}`);
    // Publish message to RabbitMQ
    rabbitChannel.sendToQueue("chat_messages", Buffer.from(JSON.stringify(messageData)));
  })
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
