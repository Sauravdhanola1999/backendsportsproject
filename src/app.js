import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

const allowedOrigins = [
  "https://race-master-360.vercel.app",
  "http://localhost:5173", // for local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Swagger API Documentation (optional - only loads if packages are installed)
(async () => {
  try {
    const { swaggerUi, swaggerDocument } = await import("./config/swagger.js");
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'Dhakkan API Documentation'
    }));
    console.log('✅ Swagger UI available at /api-docs');
  } catch (error) {
    console.log('ℹ️  Swagger UI not available. Run "npm install" to enable it.');
  }
})();

app.use("/api", routes);
app.use(errorHandler);

export default app;
