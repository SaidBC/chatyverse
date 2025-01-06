const isAuthSocket = require("../middlewares/isAuthSocket");
const {
  sendMessageValidatorSocket,
  messageValidatorSocket,
} = require("../middlewares/validators/messageValidatorsSocket");
const prisma = require("../utils/prisma");

const onSendMessage = function (io, socket) {
  return async ({ content, userId, friendId, token }) => {
    const isError = sendMessageValidatorSocket({
      socket,
      token,
      userId,
      friendId,
      content,
    });
    if (isError) return;
    const isAuth = isAuthSocket({ socket, userId, token });
    if (!isAuth) return;
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
    io.to(chatId).emit("message:receive", createdMessage);
  };
};

const onReceiveLastMessage = function (io, socket) {
  return async ({ token, userId, friendId }, cb) => {
    const isError = messageValidatorSocket({ socket, token, userId, friendId });
    if (isError) return;
    const isAuth = isAuthSocket({ socket, userId, token });
    if (!isAuth) return;
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
    if (!lastMessage) return socket.emit("error", "Messages not found");
    cb(lastMessage.content, lastMessage.createdAt);
  };
};

const onJoinChat = function (io, socket) {
  return async ({ token, userId, friendId }) => {
    const isError = messageValidatorSocket({ token, userId, friendId });
    if (isError) return;
    const isAuth = isAuthSocket({ socket, userId, token });
    if (!isAuth) return;
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
    socket.emit("messages:receive", messages);
  };
};

module.exports = {
  onReceiveLastMessage,
  onJoinChat,
  onSendMessage,
};
