import { Server } from "socket.io";
import { Message } from "../models/Message.models.js";
import { configDotenv } from "dotenv";
configDotenv();

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_DOMAIN,
      credentials: true,
    },
  });

  const userSocket = new Map();
  const userActivities = new Map();

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId) => {
      userSocket.set(userId, socket.id);
      userActivities.set(userId, "Online");

      // broadcast to all the active users
      io.emit("user_connected", userId);

      socket.emit("user_online", Array.from(userSocket.keys()));

      io.emit("activities", Array.from(userActivities.entries()));
    });

    socket.on("updateActivity", ({ userId, activity }) => {
      userActivities.set(userId, activity);
      io.emit("updateActivity", { userId, activity });
    });

    socket.on("message", async (data) => {
      try {
        const { senderId, receiverId, message } = data;
        const addMessage = await Message.create({
          senderId,
          receiverId,
          message,
        });

        // Send message to the online receiverUser
        const receiverSocketId = userSocket.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", addMessage);
        }
        socket.emit("send_message", addMessage);
      } catch (error) {
        console.log("error while grabbing message data : ", error.message);
      }
    });

    socket.on("disconnect", () => {
      let disconnectedUserId;
      for (const [socketId, userId] of userSocket.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSocket.delete(disconnectedUserId);
          userActivities.delete(userId);
          break;
        }
      }
      if (disconnectedUserId) {
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};

export { initializeSocket };
