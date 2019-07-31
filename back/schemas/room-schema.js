const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  users: {
    type: Array,
  },
  owner_id: {
    type: String,
    required: true,
  },
  room_limit: {
    type: Number,
  },
  turn: {
    type: Number,
    default: 0,
  },
  game_dimensions: {
    sideX: {
      type: Number,
      default: 8,
    },
    sideY: {
      type: Number,
      default: 8,
    },
  },
  game_state: {
    type: Array,
  },
});

exports.RoomModel = mongoose.model("Room", RoomSchema);
