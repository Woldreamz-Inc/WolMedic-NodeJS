// swagger.js

const swaggerUICss =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "MedEquip Pro",
      version: "1.0.0",
      description: "API documentation for MedEquip Pro.",
    },
    servers: [
      {
        url: process.env.BASE_URL || "https://medequip-api.vercel.app", // Update with correct base URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to your API docs; make sure it matches your structure
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocs, {
      customCss:
        ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
      customCssUrl: swaggerUICss,
    })
  );
};

module.exports = setupSwagger;
