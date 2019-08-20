const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../src/user-functions");
const { getUserById } = require("../src/user-functions");

/* GET users listing. */
router.get("/", async function(req, res) {
  const users = await getAllUsers();
  res.send(users);
});

router.get("/:userId", async function(req, res) {
  const user = await getUserById(req.params.userId);
  res.send(user);
});

module.exports = router;
