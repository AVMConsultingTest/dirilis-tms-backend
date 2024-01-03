import { Express } from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TMS BACKEND REST APIs",
      version: "1.0.0",
    },
    servers: [
      {
        name: "heroku",
        url: "https://tranquil-everglades-96249-a8ea8630be21.herokuapp.com/api/v1"
      },
      {   
        name: "localhost",
        url: "http://localhost:4000/api/v1",
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["src/swagger/**/*.yaml"],
};

const swaggerSpec = swaggerJsDoc(options);

export default (app: Express) => {
  app.use("/docs", 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      swaggerOptions: {
        docExpansion: "none",
        filter: true,
        showRequestDuration: true,
      },
    }));
};