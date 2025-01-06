const secret = process.env.JWT_SECRET || "secret";
const jwt = require("jsonwebtoken");
const isAuthSocket = function ({ socket, userId, token }) {
  const user = jwt.verify(token, secret);
  if (user.id != userId)
    return socket.emit("error", "Unauthorized access other profiles"), false;
  return true;
};

module.exports = isAuthSocket;
