const { RoomModel } = require("../schemas/room-schema");

exports.getAllRooms = async () => {
  rooms = await RoomModel.find().catch(e => {
    return e;
  });
  return rooms;
};

exports.getOneRoom = async roomId => {
  roomTemplate = await RoomModel.find({ _id: roomId }).catch(e => {
    return e;
  });
  return roomTemplate;
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

exports.createRoom = async (roomName, ownerId) => {
  let templateRoom = new RoomModel({
    name: roomName,
    owner_id: ownerId,
  });

  if (await checkRoomExistsByName(templateRoom.name)) {
    return {
      error: 400,
      message: "This room name already exists.",
    };
  } else {
    templateRoom = await templateRoom.save().catch(e => {
      return e;
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

exports.deleteRoom = async (roomId, userId) => {
  if (checkUserIsSignedInRoom(userId, roomId)) {
    return { delete_message: "A room can't be deleted with users signed in" };
  } else {
    const deletedMessage = await RoomModel.deleteOne({ _id: roomId }).catch(e => {
      return e;
    });
    // console.log(deletedMessage);
    return deletedMessage.n ? { deleted_room_id: roomId } : { delete_message: "No room to delete with given id" };
  }
};

exports.signInRoom = async (roomId, userId) => {
  let templateRoom = new RoomModel();
  console.log(roomId, userId);
  templateRoom = await RoomModel.findOneAndUpdate({ _id: roomId }, { $addToSet: { users: userId } }, { new: true });
  return templateRoom;
};
