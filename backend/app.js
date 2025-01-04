require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRouter");
const app = express();
const PORT = process.env.PORT || 8000;
const cors = require("cors");
const authRouter = require("./routes/authRouter");
const friendRequestRouter = require("./routes/friendRequestRouter");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", userRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", friendRequestRouter);

app.all("*", (_, res) => {
  res.json({
    success: false,
    error: {
      name: "NotFoundError",
      statusCode: 404,
      message: "PAGE NOT FOUND",
    },
  });
});

const { Server } = require("socket.io");
const prisma = require("./utils/prisma");
const server = require("http").createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("A User Connected");
  socket.on("join-chat", async ({ token, userId, friendId }) => {
    if (!token) return socket.emit("error", "no token provided");
    if (!Number.isInteger(+friendId))
      return socket.emit("error", "invalid friend id");
    if (!Number.isInteger(+userId))
      return socket.emit("error", "invalid user id");
    const chatId = `${Math.min(userId, friendId)}/${Math.max(
      userId,
      friendId
    )}`;
    socket.join(chatId);
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            authorId: Number(userId),
            receiverId: Number(friendId),
          },
          {
            authorId: Number(friendId),
            receiverId: Number(userId),
          },
        ],
      },
    });
    socket.emit("receive-messages", messages);
  });
  socket.on("send-message", async ({ content, userId, friendId, token }) => {
    if (!token) return socket.emit("error", "no token provided");
    if (!Number.isInteger(+friendId))
      return socket.emit("error", "invalid friend id");
    if (!Number.isInteger(+userId))
      return socket.emit("error", "invalid user id");
    const chatId = `${Math.min(userId, friendId)}/${Math.max(
      userId,
      friendId
    )}`;
    const createdMessage = await prisma.message.create({
      data: {
        authorId: Number(userId),
        receiverId: Number(friendId),
        content: content,
      },
    });
    io.to(chatId).emit("receive-message", createdMessage);
  });
  socket.on("receive-last-message", async ({ token, userId, friendId }, cb) => {
    const lastMessage = await prisma.message.findFirst({
      where: {
        OR: [
          {
            authorId: Number(userId),
            receiverId: Number(friendId),
          },
          {
            authorId: Number(friendId),
            receiverId: Number(userId),
          },
        ],
      },

      orderBy: { createdAt: "desc" },
    });
    cb(lastMessage.content, lastMessage.createdAt);
  });
});

server.listen(8000, () => {
  console.log("the application is running at port ", PORT);
});
