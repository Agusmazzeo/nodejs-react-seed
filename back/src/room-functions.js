const { RoomModel } = require("../db/dbConfig");

exports.getAllRooms = async (req, res) => {
  return (roomTemplate = await RoomModel.find({}).catch(e => {
    console.log(e);
  }));
};

exports.getOneRoom = async (req, res) => {
  return (roomTemplate = await RoomModel.find({ _id: req.params.id }).catch(e => {
    console.log(e);
  }));
};

checkRoomExistsByName = async roomName => {
  const templateRoom = await RoomModel.find({ name: roomName }).catch(e => {
    res.send(e);
  });

  if (templateRoom.length && templateRoom) {
    return true;
  } else {
    return false;
  }
};

exports.createRoom = async (req, res) => {
  let templateRoom = new RoomModel({
    name: req.body.room_name,
    owner_id: req.headers.authorization,
  });

  if (await checkRoomExistsByName(templateRoom.name)) {
    res.status(400).send({
      message: "This room name already exists.",
    });
  } else {
    templateRoom = await templateRoom.save().catch(e => {
      res.send(e);
    });

    return templateRoom;
  }
};

checkUserIsSignedInRoom = async (user_id, room_id) => {
  const existsUserInRoom = await RoomModel.find({
    users: { $elemMatch: user_id },
  });
  if (existsUserInRoom) {
    return true;
  } else {
    return false;
  }
};

exports.deleteRoom = async (req, res) => {
  if (checkUserIsSignedInRoom(req.headers.authorization, req.params.room_id)) {
    return { delete_message: "A room can't be deleted with users signed in" };
  } else {
    const deletedMessage = await RoomModel.deleteOne({ _id: req.params.room_id }).catch(e => {
      console.log(e);
    });
    console.log(deletedMessage);
    return deletedMessage.n
      ? { deleted_room_id: req.params.room_id }
      : { delete_message: "No room to delete with given id" };
  }
};

exports.signInRoom = async (req, res) => {
  let templateRoom = new RoomModel();
  templateRoom = RoomModel.findOneAndUpdate(
    { _id: req.params.room_id },
    { $addToSet: { users: req.headers.authorization } },
    { new: true },
  );
  return templateRoom;
};
