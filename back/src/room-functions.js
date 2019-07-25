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
  templateRoom = await RoomModel.findOneAndUpdate({ _id: roomId }, { $addToSet: { users: userId } }, { new: true });
  return templateRoom;
};

exports.signOutRoom = async (roomId, userId) => {
  let templateRoom = new RoomModel();
  templateRoom = (await RoomModel.find({ _id: roomId }))[0];
  console.log(templateRoom)
  if (templateRoom.users.length == 1 && templateRoom.owner_id == userId) {
    await RoomModel.deleteOne({ _id: roomId }).catch(e => {
      return e;
    });
  } else if (templateRoom.users.length > 1) {
    var index = templateRoom.users.indexOf(userId);
    if (templateRoom.owner_id == userId) {
      templateRoom.owner_id = templateRoom.users[index + 1];
    }
    templateRoom.users.split(index, 1);
  }
  templateRoom = await RoomModel.updateOne({ _id: roomId }, templateRoom, { new: true });
  return templateRoom;
};
