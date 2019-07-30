const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const { webSocketHandler } = require("./web-socket/webSocketHandler");

const usersRouter = require("./routes/users");
const lobbyRouter = require("./routes/lobby");
const roomsRouter = require("./routes/rooms");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server).listen(3001);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  .connect("mongodb://mongo/game", { useNewUrlParser: true }, () => {
    console.log("Conexión realizada a base de datos!");
  })
  .catch(new Error("No fue posible realizar la conexión a la base de datos..."));
mongoose.set("useFindAndModify", false);

app.use("/api/lobby", lobbyRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/users", usersRouter);

webSocketHandler(io);

module.exports = app;
