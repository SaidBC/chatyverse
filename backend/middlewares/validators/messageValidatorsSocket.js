const messageValidatorSocket = function ({ socket, token, userId, friendId }) {
  if (!token) return socket.emit("error", "no token provided"), true;
  if (!Number.isInteger(+friendId))
    return socket.emit("error", "invalid friend id"), true;
  if (!Number.isInteger(+userId))
    return socket.emit("error", "invalid user id"), true;
};

const sendMessageValidatorSocket = function ({
  socket,
  token,
  userId,
  friendId,
  content,
}) {
  if (!token) return socket.emit("error", "no token provided"), true;
  if (!Number.isInteger(+friendId))
    return socket.emit("error", "invalid friend id"), true;
  if (!Number.isInteger(+userId))
    return socket.emit("error", "invalid user id"), true;
  if (typeof content === "string")
    return socket.emit("error", "content must be a valide string"), true;
};

module.exports = {
  messageValidatorSocket,
  sendMessageValidatorSocket,
};
