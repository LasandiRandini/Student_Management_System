// import express from "express";
// // import userRoutes from "./routes/users.js"
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// const app = express();
// app.use(cors());

// app.use(express.json())
// app.use(cookieParser())

// mongoose.connect('mongodb+srv://lasandi:lara@123@sms.wpdwk.mongodb.net/?retryWrites=true&w=majority&appName=SMS');

// // app.use("/api/users", userRoutes)

// app.listen(8800, () => {
//     console.log("Connected!")
// })

import express from "express";
import departmentRoutes from "./routes/department_route.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/departments", departmentRoutes)

const MONGO_URI = 'mongodb+srv://lasandi:lara%40123@sms.wpdwk.mongodb.net/?retryWrites=true&w=majority&appName=SMS';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error("MongoDB Connection Error: ", err));



app.listen(8800, () => {
  console.log("Server running on port 8800!");
});
