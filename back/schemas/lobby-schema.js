const mongoose = require("mongoose");

const LobbySchema = mongoose.Schema({
  user_logged: {
    type: String,
  },
});

exports.LobbyModel = mongoose.model("Lobby", LobbySchema);
