// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import http from "http";
// import amqp from "amqplib";
// import swaggerUi from "swagger-ui-express";
// import { swaggerSpec } from "./swaggerOptions.js";

// import { WebSocketServer } from "ws";

// import departmentRoute from "./routes/department_route.js";
// import studentRoute from "./routes/student_route.js";
// import moduleRoute from "./routes/module_route.js";
// import studentModuleRoute from "./routes/student_module_route.js";
// import adminRoute from "./routes/admin_route.js";
// import dashboardRoutes from './routes/dashboard_route.js';
// import inquiryRoute from "./routes/inquiry_route.js"; 

// dotenv.config();


// const app = express();
// const server = http.createServer(app);  
// const wss = new WebSocketServer({ server });  


// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());
// app.use('/uploads', express.static('uploads'));


// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use("/api/departments", departmentRoute);
// app.use("/api/students", studentRoute);
// app.use("/api/modules", moduleRoute);
// app.use("/api/student_modules", studentModuleRoute);
// app.use("/api/admins", adminRoute);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/inquiries", inquiryRoute);  

// const PORT = process.env.PORT || 9090;
// const MONGO_URL = process.env.MONGO_URL;


// mongoose
//   .connect(MONGO_URL)
//   .then(() => {
//     console.log("Database is connected");
//   })
//   .catch((err) => {
//     console.error(`Error: ${err}`);
//     process.exit(1); 
//   });

// wss.on("connection", (ws) => {
//   console.log("WebSocket connection established");
//   ws.send(JSON.stringify({ message: "Connected to WebSocket server" }));
// });


// amqp.connect("amqp://localhost", (err, connection) => {
//   if (err) throw err;

//   connection.createChannel((channelErr, channel) => {
//     if (channelErr) throw channelErr;

//     const queue = "inquiryQueue";
//     channel.assertQueue(queue, { durable: false });

    
//     channel.consume(queue, (msg) => {
//       if (msg) {
//         const inquiry = JSON.parse(msg.content.toString());

        
//         wss.clients.forEach((client) => {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(inquiry));
//           }
//         });

//         console.log("Broadcasted inquiry to WebSocket clients:", inquiry);
//       }
//     });
//   });
// });


// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import http from "http";
// // import amqp from "amqplib/callback_api";
// import amqp from "amqplib";
// import swaggerUi from "swagger-ui-express";
// import { swaggerSpec } from "./swaggerOptions.js";
// import { WebSocketServer } from "ws";


// import departmentRoute from "./routes/department_route.js";
// import studentRoute from "./routes/student_route.js";
// import moduleRoute from "./routes/module_route.js";
// import studentModuleRoute from "./routes/student_module_route.js";
// import adminRoute from "./routes/admin_route.js";
// import dashboardRoutes from "./routes/dashboard_route.js";
// import inquiryRoute from "./routes/inquiry_route.js"; 

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocketServer({ server }); 


// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());
// app.use('/uploads', express.static('uploads'));


// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// app.use("/api/departments", departmentRoute);
// app.use("/api/students", studentRoute);
// app.use("/api/modules", moduleRoute);
// app.use("/api/student_modules", studentModuleRoute);
// app.use("/api/admins", adminRoute);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/inquiries", inquiryRoute); 


// const PORT = process.env.PORT || 9090;
// const MONGO_URL = process.env.MONGO_URL;


// mongoose
//   .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Database is connected");
//   })
//   .catch((err) => {
//     console.error(`Error: ${err}`);
//     process.exit(1); 
//   });


// wss.on("connection", (ws) => {
  
//   ws.send(JSON.stringify({ message: "Connected to WebSocket server" }));

//   ws.on("close", () => {
//     console.log("WebSocket connection closed");
//   });
// });


// amqp.connect("amqp://localhost", (err, connection) => {
//   if (err) {
//     console.error("Failed to connect to RabbitMQ", err);
//     return;
//   }

//   connection.createChannel((channelErr, channel) => {
//     if (channelErr) {
//       console.error("Failed to create channel", channelErr);
//       return;
//     }

//     const queue = "inquiryQueue";
//     channel.assertQueue(queue, { durable: false });

//     channel.consume(queue, (msg) => {
//       if (msg) {
//         const inquiry = JSON.parse(msg.content.toString());

        
//         wss.clients.forEach((client) => {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(inquiry));
//           }
//         });

//         console.log("Broadcasted inquiry to WebSocket clients:", inquiry);
//       }
//     });
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


const setupRabbitMQ = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    rabbitChannel = await connection.createChannel();
    console.log("RabbitMQ connected");

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


io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  
  const registrationTimeout = setTimeout(() => {
    if (!socket.userId) {
      console.warn(`Socket ${socket.id} did not register within the allowed time. Disconnecting...`);
      socket.disconnect(true);
    }
  }, 5000); 

 
  socket.on("register", async (userId) => {
    if (!userId) {
      console.warn(`Register event received without userId for socket ${socket.id}`);
      return;
    }

    clearTimeout(registrationTimeout); 

    
    socket.userId = userId;
    userSockets[userId] = socket.id;
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
  });

 
  socket.on("disconnect", () => {
    if (socket.userId) {
      console.log(`User disconnected: ${socket.id}, User ID: ${socket.userId}`);
      
      if (userSockets[socket.userId] === socket.id) {
        delete userSockets[socket.userId];
      }
    } else {
      console.warn(`Socket disconnected without user ID: ${socket.id}`);
    }
  });

  
  socket.on("sendMessage", async (messageData) => {
    const { sender, recipient, content } = messageData;
    const recipientSocketId = userSockets[recipient];

    if (recipientSocketId) {
      
      io.to(recipientSocketId).emit("receiveMessage", messageData);
      console.log(`Message sent from ${sender} to ${recipient} (Socket ID: ${recipientSocketId})`);
    } else {
      console.warn(`Recipient ${recipient} is not online or not registered with a socket ID.`);
      
     
    }
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
