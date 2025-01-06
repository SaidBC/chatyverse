const { Server } = require("socket.io");
const {
  onJoinChat,
  onSendMessage,
  onReceiveLastMessage,
} = require("./events/messageSocket");

const socketInit = function (server) {
  const io = new Server(server, { cors: { origin: "*" } });
  io.on("connection", (socket) => {
    console.log("A User Connected");
    socket.on("chat:join", onJoinChat(io, socket));
    socket.on("message:send", onSendMessage(io, socket));
    socket.on("last-message:receive", onReceiveLastMessage(io, socket));
  });
};

module.exports = socketInit;
