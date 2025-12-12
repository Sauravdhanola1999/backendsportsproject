import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";

import http from "http";  
import { initSocket } from "./src/sockets/socket.js";  

const PORT = process.env.PORT || 5000;


const server = http.createServer(app);

const startServer = async () => {
  await connectDB();   

  initSocket(server);

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
