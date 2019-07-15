const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { logInLobby } = require("../src/lobby-functions");
const { logOutLobby } = require("../src/lobby-functions");

/*===================================================================*/

router.post("/", async (req, res) => {
  res.send(await logInLobby(req, res));
});

router.post("/log_out", async (req, res) => {
  res.send(await logOutLobby(req, res));
});

/*==================================================================*/
module.exports = router;
