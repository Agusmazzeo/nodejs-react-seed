const { turnHandler } = require("../gameHandler/turnHandler");
const { winnerCheck } = require("../gameHandler/winnerCheck");

exports.webSocketHandler = io => {
  io.on("connection", socket => {
    console.log("Se conectaron al socket");

    socket.on("Join room", (roomId, userName) => {
      socket.join(roomId);
      socket.broadcast.to(roomId).emit("Joined user", userName);
    });

    socket.on("Turn played", async (userId, roomId, gameState, index) => {
      const userTurn = await turnHandler(userId, roomId, gameState);
      if (winnerCheck(gameState, index, 4, 8)) {
        console.log("Anduvooooo");
      }
      socket.broadcast.to(roomId).emit("Turn played", gameState, userTurn);
    });

    socket.on("User disconnected", roomId => {
      socket.broadcast.to(roomId).emit("User disconnected");
    });
  });
};
