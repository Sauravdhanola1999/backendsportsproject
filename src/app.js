import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

const allowedOrigins = [
  "https://race-master-nu.vercel.app",
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
app.use("/api", routes);
app.use(errorHandler);

export default app;
