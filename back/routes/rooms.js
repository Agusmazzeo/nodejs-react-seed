const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { getAllRooms } = require("../src/room-functions");
const { getOneRoom } = require("../src/room-functions");
const { createRoom } = require("../src/room-functions");
const { checkUserExistsById } = require("../src/user-functions");
const { checkUserIsOwnerById } = require("../src/user-functions");
const { signInRoom } = require("../src/room-functions");
const { deleteRoom } = require("../src/room-functions");

router.get("/", async (req, res) => {
  const rooms = await getAllRooms();
  res.send(rooms);
});
router.get("/:roomId", async (req, res) => {
  const room = await getOneRoom(req, res);
  res.send(room);
});

router.post("/", checkUserExistsById, async (req, res) => {
  const createdRoom = await createRoom(req, res);
  res.send(createdRoom);
});

router.post("/sign_in/:room_id", checkUserExistsById, async (req, res) => {
  const signedInRoom = await signInRoom(req, res);
  res.send(signedInRoom);
});
router.post("/delete/:room_id", checkUserIsOwnerById, async (req, res) => {
  const deletedRoom = await deleteRoom(req, res);
  res.send(deletedRoom);
});

/*=========================================================================*/

module.exports = router;
