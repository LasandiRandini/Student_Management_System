
// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import departmentRoute from "./routes/department_route.js";
// import studentRoute from "./routes/student_route.js";

// const app = express() ;
// dotenv.config();

// const PORT = process.env.PORT;
// const MONGO_URL = process.env.MONGO_URL;

// app.use("/api/departments", departmentRoute)
// app.use("/api/students", studentRoute)

// mongoose
// .connect(MONGO_URL)
// .then(() => {
//         console.log(`Database is connected`);
//         app.listen(PORT, () => {
//                 console.log(`Server is running on port ${PORT}`);
//         });
//     }).catch((err) => {
//         console.log(`Error: ${err}`);
//     });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import departmentRoute from "./routes/department_route.js";
import studentRoute from "./routes/student_route.js";
import ModuleRoute from "./routes/module_route.js";
import studentModuleRoute from "./routes/student_module_route.js";

import adminRoute from "./routes/admin_route.js";

import dashboardRoutes from './routes/dashboard_route.js';

import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();

app.use(cors());

app.use(express.json())
app.use(cookieParser())

dotenv.config();

app.use("/api/departments", departmentRoute);
app.use("/api/students", studentRoute);
app.use("/api/modules", ModuleRoute);
app.use("/api/student_modules", studentModuleRoute);

app.use("/api/admins", adminRoute);

app.use('/api/dashboard', dashboardRoutes);


const PORT = process.env.PORT ;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error: ${err}`);
    process.exit(1); 
  });
// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Database is connected");
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error(`Error: ${err}`);
//     process.exit(1); 
//   });
