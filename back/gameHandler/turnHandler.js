const { RoomModel } = require("../schemas/room-schema");

exports.turnHandler = async (userId, roomId, gameState) => {
  let roomTemplate = (await RoomModel.find({ _id: roomId }).catch(e => console.log(e)))[0];
  let turn =
    roomTemplate.users.indexOf(userId) < roomTemplate.users.length - 1 ? roomTemplate.users.indexOf(userId) + 1 : 0;
  roomTemplate.game_state = gameState;
  roomTemplate.turn = turn;
  roomTemplate = await roomTemplate.save().catch(e => console.log(e));
  return roomTemplate.users[turn];
};
