require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRouter");
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;

const authRouter = require("./routes/authRouter");
const friendRequestRouter = require("./routes/friendRequestRouter");
const socketInit = require("./socketInit");
const corsOpts = {
  origin: CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOpts));
app.use(cookieParser());
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

socketInit(io);

http.listen(PORT, () => {
  console.log("App listening on PORT ", PORT);
});
