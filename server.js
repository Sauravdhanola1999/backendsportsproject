import "dotenv/config"; // 👈 cleaner than dotenv import

import http from "http";
import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";
import { initSocket } from "./src/sockets/socket.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ Database connection failed, continuing...");
  }

  initSocket(server);

  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
