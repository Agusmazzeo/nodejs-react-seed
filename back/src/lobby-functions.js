const mongoose = require("mongoose");
const { UserModel } = require("../db/dbConfig");
const { checkExistingUsername } = require("../src/user-functions");

exports.logInLobby = async (req, res) => {
  const username = req.body.user_name;
  const userEmail = req.body.email;
  const userAge = req.body.age ? req.body.age : 0;

  if (await checkExistingUsername(username, userEmail)) {
    return { error: "El nombre de usuario/email ya existe..." };
  } else {
    let user = new UserModel({
      name: username,
      email: userEmail,
    });

    user = await user.save().catch(e => {
      res.send(e);
    });
    return user;
  }

  //Guardar el usuario en la base de datos y devolver usuario completo
};

exports.logOutLobby = async (req, res) => {
  const deletedMessage = await UserModel.deleteOne({ _id: req.headers.authorization }).catch(e => {
    console.log(e);
  });
  console.log(deletedMessage);
  return deletedMessage.n
    ? { deleted_user_id: req.headers.authorization }
    : { delete_message: "No user to delete with given id" };
};
