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
        url: "http://localhost:9090/", 
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
