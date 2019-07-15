const mongoose = require("mongoose");
const schema = mongoose.Schema;

mongoose
  .connect("mongodb://mongo/game", { useNewUrlParser: true }, () => {
    console.log("Conexión realizada a base de datos!");
  })
  .catch(new Error("No fue posible realizar la conexión a la base de datos..."));

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    default: 0,
  },
});

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
  room_limit:{
    type: Number,
  }
});

exports.UserModel = mongoose.model("User", UserSchema);
exports.RoomModel = mongoose.model("Room", RoomSchema);
