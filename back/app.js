const express = require("express");
const passport = require("passport");
const http = require("http");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const cors = require("cors");

const { webSocketHandler } = require("./web-socket/webSocketHandler");

/*===========Importo los esquemas de base de datos===============*/
require("./schemas/lobby-schema");
require("./schemas/room-schema");
require("./schemas/user-schema");
/*===============================================================*/
require("./config/passportConfig");
/* ========================Rutas aplicacion======================*/
const usersRouter = require("./routes/users");
const lobbyRouter = require("./routes/lobby");
const roomsRouter = require("./routes/rooms");
/*===============================================================*/

const app = express();
/*=============Funciones de autenticación de Google====================*/

const server = http.createServer(app);
const PORT = process.env.PORT || 3001;
const io = require("socket.io")(server).listen(PORT);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose
  // .connect(
  //   "mongodb+srv://amazzeo:Blaziken97@cluster0-wo29r.mongodb.net/test?retryWrites=true&w=majority",
  //   { useNewUrlParser: true },
  //   () => {
  .connect("mongodb://mongo/game", { useNewUrlParser: true }, () => {
    console.log("Conexión realizada a base de datos!");
  })
  .catch(new Error("No fue posible realizar la conexión a la base de datos..."));
mongoose.set("useFindAndModify", false);
/*===========================Cookies and Passport auth================================*/
app.use(
  cookieSession({
    name: "user_cookie",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey], //encriptation
  }),
);
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authentication/passportRoutes")(app);
/*==================================Routers==========================================*/

app.use("/api/lobby", lobbyRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/users", usersRouter);

/*===================================================================================*/
webSocketHandler(io);

module.exports = app;
