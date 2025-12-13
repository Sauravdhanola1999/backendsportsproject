import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import resultService from "../services/result.service";
// import leaderboardService from "../services/leaderboard.service.js";

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
      origin: "*", // Change to your frontend URL in production
      methods: ["GET", "POST"],
    },
  });

  // Middleware: JWT authentication (optional)
  io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  // public viewers → allow
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    socket.user = decoded;
    next();
  } catch (err) {
    return next(new Error("Invalid token"));
  }
});


  // Connection handler
  io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("joinLeaderboard", async ({ eventId }) => {
    if (!eventId) return;

    const room = `leaderboard:${String(eventId)}`;
    socket.join(room);

    console.log(`Client ${socket.id} joined ${room}`);

    try {

      const leaderboard = await resultService.getLeaderboard(eventId);

      // 🔥 emit ONLY array
      socket.emit("leaderboard:update", leaderboard);
    } catch (err) {
      console.error("Socket leaderboard error:", err);
    }
  });

  socket.on("leaveLeaderboard", ({ eventId }) => {
    if (!eventId) return;
    socket.leave(`leaderboard:${String(eventId)}`);
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
