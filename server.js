const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const restrict = require("./restrict");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");
server.use(express.json());
server.use(cookieParser());
server.use(cors());

server.use((err, req, res, next) => {
  res.status(500).json({
    message: "sth went wrong",
  });
});
server.use("/api/users", userRouter);
server.use("/api/post", restrict("basic"), postRouter);

server.get("/", (req, res) => {
  res.send(`Build Week Api Up`);
});

module.exports = server;
