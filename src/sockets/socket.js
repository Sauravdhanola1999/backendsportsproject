// src/sockets/socket.js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io = null;

// Map used for debouncing leaderboard emits
const debounceMap = new Map();

/**
 * Initialize Socket.IO
 */
export function initSocket(server) {
  if (io) return io; // Prevent re-initialization

  io = new Server(server, {
  cors: {
    origin: "*", // change to frontend URL before production
    methods: ["GET", "POST"],
  },
  path: "/socket.io",        // 🔥 REQUIRED
  allowEIO3: true,           // 🔥 Fix polling fallback issue
  transports: ["websocket"], // 🔥 Force WebSocket only
});


  // Middleware: JWT authentication (optional)
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    // If no auth needed → uncomment next()
    // return next();

    if (!token) {
      return next(new Error("Auth token missing"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
      socket.user = decoded; // attach user info
      return next();
    } catch (err) {
      return next(new Error("Invalid token"));
    }
  });

  // Connection handler
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // Join event leaderboard room
    socket.on("joinLeaderboard", ({ eventId }) => {
      if (!eventId) return;
      const room = `leaderboard:${eventId}`;
      socket.join(room);
      console.log(`Client ${socket.id} joined room ${room}`);
    });

    // Leave leaderboard room
    socket.on("leaveLeaderboard", ({ eventId }) => {
      if (!eventId) return;
      const room = `leaderboard:${eventId}`;
      socket.leave(room);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  console.log("Socket.IO initialized");
  return io;
}

/**
 * Get Socket.IO instance anywhere in the app
 */
export function getIO() {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
}

/**
 * Debounced emission to avoid spamming clients when many results update at once.
 */
export function emitLeaderboardDebounced(eventId, payload, delay = 200) {
  const room = `leaderboard:${eventId}`;
  const key = room;

  // Clear previous debounce timer for this room
  if (debounceMap.has(key)) {
    clearTimeout(debounceMap.get(key));
  }

  const timer = setTimeout(() => {
    try {
      getIO().to(room).emit("leaderboard:update", payload);
      console.log(`Emitted leaderboard update to ${room}`);
    } catch (err) {
      console.error("Failed to emit leaderboard update:", err);
    }
    debounceMap.delete(key);
  }, delay);

  debounceMap.set(key, timer);
}
