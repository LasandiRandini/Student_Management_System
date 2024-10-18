
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import departmentRoute from "./routes/department_route.js";
import studentRoute from "./routes/student_route.js";

const app = express() ;
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use("/api/departments", departmentRoute)
app.use("/api/students", studentRoute)

mongoose
.connect(MONGO_URL)
.then(() => {
        console.log(`Database is connected`);
        app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
        });
    }).catch((err) => {
        console.log(`Error: ${err}`);
    });
