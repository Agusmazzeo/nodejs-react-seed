const mongoose = require("mongoose");

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

  googleId: {
    type: Number,
    default: 0,
  },
});

exports.UserModel = mongoose.model("User", UserSchema);
/*
con mongoose podes hacer directamente "mongoose.model("User", UserSchema)" y despues usarlo sin require
haciendo : user = mongoose.model("User") -> 1 argumento significa que quiero sacar informacion de mongoose


*/
