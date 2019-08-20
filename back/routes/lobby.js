const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { logInLobby } = require("../src/lobby-functions");
const { logOutLobby } = require("../src/lobby-functions");

/*===================================================================*/

router.post("/", async (req, res) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  };
  res.send(await logInLobby(userData));
});

router.delete("/log_out", async (req, res) => {
  const userId = req.headers.authorization;
  res.send(await logOutLobby(userId));
});

/*==================================================================*/
module.exports = router;
