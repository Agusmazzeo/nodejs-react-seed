const mongoose = require("mongoose");
const { checkExistingUsername } = require("../src/user-functions");
const { createUser } = require("../src/user-functions");
const { LobbyModel } = require("../schemas/lobby-schema");

exports.logInLobby = async userData => {
  const username = userData.name;
  const userEmail = userData.email;
  const userAge = userData.age ? userData.age : 0;
  // console.log(userData);
  const existingUser = await checkExistingUsername(username, userEmail);
  let lobby = new LobbyModel();
  if (existingUser) {
    const loggedUser = await getUserLoggedById(existingUser._id);

    if (loggedUser) {
      return { error: "El usuario ya se encuentra logueado" };
    } else {
      lobby.user_logged = existingUser._id;
      lobby = lobby.save().catch(e => {
        return e;
      });

      return existingUser._id;
    }
  } else {
    const newUser = await createUser(username, userEmail, userAge);
    lobby.user_logged = newUser._id;
    lobby = lobby.save().catch(e => {
      return e;
    });
    return newUser._id;
  }

  //Guardar el usuario en la base de datos y devolver usuario completo
};

exports.logOutLobby = async userId => {
  const deletedMessage = await LobbyModel.deleteOne({ logged_user: userId }).catch(e => {
    return e;
  });
  // console.log(deletedMessage);
  return deletedMessage.n ? { deleted_user_id: userId } : { delete_message: "No user to delete with given id" };
};

/*========================LOCALES==============================*/
getUserLoggedById = async userId => {
  const userLogged = await LobbyModel.find({ user_logged: userId });

  return userLogged[0];
};
