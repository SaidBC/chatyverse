require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRouter");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const PORT = process.env.PORT || 8000;

const authRouter = require("./routes/authRouter");
const friendRequestRouter = require("./routes/friendRequestRouter");
const socketInit = require("./socketInit");

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

socketInit(server);

server.listen(8000, () => {
  console.log("the application is running at port ", PORT);
});
