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
    if (!lastMessage) return cb(null, null);
    cb(lastMessage.content, lastMessage.createdAt);
  };
};

const onJoinChat = function (io, socket) {
  return async ({ token, userId, friendId }) => {
    const isError = messageValidatorSocket({ socket, token, userId, friendId });
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
const onReceiveLastMessages = function (io, socket) {
  return async ({ token, userId }, cb) => {
    const isAuth = isAuthSocket({ socket, userId, token });
    if (!isAuth) return;

    const lastMessages = await prisma.message.findMany({
      where: {
        OR: [
          {
            authorId: Number(userId),
          },
          {
            receiverId: Number(userId),
          },
        ],
      },
      distinct: ["authorId", "receiverId"],
      orderBy: {
        createdAt: "desc",
      },
    });

    const chatIds = new Set();
    const lastMessageWithUserPromises = lastMessages.map(async (message) => {
      const chatId = `${Math.min(
        message.authorId,
        message.receiverId
      )}/${Math.max(message.authorId, message.receiverId)}`;

      if (!chatIds.has(chatId)) {
        chatIds.add(chatId);
        const friendId =
          message.authorId === Number(userId)
            ? message.receiverId
            : message.authorId;

        const friend = await prisma.user.findUnique({
          where: {
            id: friendId,
          },
          select: {
            id: true,
            username: true,
            online: true,
            profilePicture: true,
          },
        });

        return {
          createdAt: message.createdAt,
          content: message.content,
          authorId: friend.id,
          authorUsername: friend.username,
          authorOnline: friend.online,
          authorProfilePicture: friend.profilePicture,
        };
      }
    });

    const lastMessageWithUser = (
      await Promise.all(lastMessageWithUserPromises)
    ).filter(Boolean);

    cb(lastMessageWithUser);
  };
};

module.exports = {
  onReceiveLastMessage,
  onJoinChat,
  onSendMessage,
  onReceiveLastMessages,
};
