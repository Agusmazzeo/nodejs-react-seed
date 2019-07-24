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
});

exports.RoomModel = mongoose.model("Room", RoomSchema);
