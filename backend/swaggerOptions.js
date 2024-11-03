// swaggerOptions.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Management System",
      version: "1.0.0",
      description: "API documentation for Student Management System",
    },
    servers: [
      {
        url: "http://localhost:9090/", // Base URL for your API
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your route files
};

export const swaggerSpec = swaggerJSDoc(options);
