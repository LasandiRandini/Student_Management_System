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

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
// import amqp from "amqplib/callback_api";
import amqp from "amqplib";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerOptions.js";
import { WebSocketServer } from "ws";

// Importing routes
import departmentRoute from "./routes/department_route.js";
import studentRoute from "./routes/student_route.js";
import moduleRoute from "./routes/module_route.js";
import studentModuleRoute from "./routes/student_module_route.js";
import adminRoute from "./routes/admin_route.js";
import dashboardRoutes from "./routes/dashboard_route.js";
import inquiryRoute from "./routes/inquiry_route.js"; // Inquiry route

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server }); // WebSocket server

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use("/api/departments", departmentRoute);
app.use("/api/students", studentRoute);
app.use("/api/modules", moduleRoute);
app.use("/api/student_modules", studentModuleRoute);
app.use("/api/admins", adminRoute);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/inquiries", inquiryRoute); // Adding the inquiry route

// Constants for server and database connection
const PORT = process.env.PORT || 9090;
const MONGO_URL = process.env.MONGO_URL;

// Connect to MongoDB
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
    process.exit(1); // Exit if the database connection fails
  });

// WebSocket connection handling
wss.on("connection", (ws) => {
  
  ws.send(JSON.stringify({ message: "Connected to WebSocket server" }));

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

// RabbitMQ setup and integration
amqp.connect("amqp://localhost", (err, connection) => {
  if (err) {
    console.error("Failed to connect to RabbitMQ", err);
    return;
  }

  connection.createChannel((channelErr, channel) => {
    if (channelErr) {
      console.error("Failed to create channel", channelErr);
      return;
    }

    const queue = "inquiryQueue";
    channel.assertQueue(queue, { durable: false });

    channel.consume(queue, (msg) => {
      if (msg) {
        const inquiry = JSON.parse(msg.content.toString());

        // Broadcast inquiry to all connected WebSocket clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(inquiry));
          }
        });

        console.log("Broadcasted inquiry to WebSocket clients:", inquiry);
      }
    });
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
