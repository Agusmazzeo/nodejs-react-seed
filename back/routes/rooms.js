const express = require("express");
const router = express.Router();
const { getAllRooms } = require("../src/room-functions");
const { getOneRoom } = require("../src/room-functions");
const { createRoom } = require("../src/room-functions");
const { checkUserExistsById } = require("../src/user-functions");
const { checkUserIsOwnerById } = require("../src/user-functions");
const { signInRoom } = require("../src/room-functions");
const { signOutRoom } = require("../src/room-functions");
const { deleteRoom } = require("../src/room-functions");

router.get("/", async (req, res) => {
  const rooms = await getAllRooms();
  res.send(rooms);
});
router.get("/:roomId", async (req, res) => {
  const room = await getOneRoom(req.params.roomId);
  res.send(room);
});

router.post("/", checkUserExistsById, async (req, res) => {
  const createdRoom = await createRoom(req.body.room_name, req.headers.authorization);
  res.send(createdRoom);
});

router.post("/sign_in/:room_id", checkUserExistsById, async (req, res) => {
  const signedInRoom = await signInRoom(req.params.room_id, req.headers.authorization);
  res.send(signedInRoom);
});

router.post("/sign_out/:room_id", checkUserExistsById, async (req, res) => {
  // console.log(req);
  const signedOutRoom = await signOutRoom(req.params.room_id, req.headers.authorization);
  res.send(signedOutRoom);
});

router.post("/delete/:room_id", checkUserIsOwnerById, async (req, res) => {
  const deletedRoom = await deleteRoom(req.headers.authorization, req.params.room_id);
  res.send(deletedRoom);
});

/*=========================================================================*/

module.exports = router;
