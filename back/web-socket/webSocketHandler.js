exports.webSocketHandler = io => {
  io.on("connection", socket => {
    console.log("Se conectaron al socket");

    socket.on("Join room", (roomId, userName) => {
      socket.join(roomId);
      socket.broadcast.to(roomId).emit("Joined user", userName);
    });
  });
};
