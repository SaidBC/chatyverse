const { Server } = require("socket.io");
const {
  onJoinChat,
  onSendMessage,
  onReceiveLastMessage,
  onReceiveLastMessages,
} = require("./events/messageSocket");
const isAuthSocket = require("./middlewares/isAuthSocket");
const prisma = require("./utils/prisma");

const socketInit = function (server) {
  const io = new Server(server, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    console.log("A User Connected");
    socket.on("app:connect", async (userId, token) => {
      const isAuth = isAuthSocket({ socket, userId, token });
      if (!isAuth) return;
      await prisma.user.update({
        where: { id: userId },
        data: {
          online: true,
        },
      });
      socket.on("chat:join", onJoinChat(io, socket));
      socket.on("message:send", onSendMessage(io, socket));
      socket.on("last-message:receive", onReceiveLastMessage(io, socket));
      socket.on("last-messages:receive", onReceiveLastMessages(io, socket));
      socket.on("disconnect", async () => {
        await prisma.user.update({
          where: { id: userId },
          data: {
            online: false,
          },
        });
      });
    });
  });
};

module.exports = socketInit;
