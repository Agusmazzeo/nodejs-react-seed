const mongoose = require("mongoose");
const UserModel = mongoose.model("User");

exports.checkExistingUsername = async (username, userEmail) => {
  const existsUser = await UserModel.find({ name: username });
  const existsEmail = await UserModel.find({ email: userEmail });
  // console.log(username);
  return existsUser.length || existsEmail.length ? existsUser[0] : null;
};

exports.checkUserExistsById = async (req, res, next) => {
  console.log(req.headers);
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Authentication required",
    });
  } else {
    const user = await UserModel.findById(req.headers.authorization).catch(e => {
      console.log(e);
    });
    //  console.log(user);
    if (user) {
      res.locals.auth = {
        user,
      };
      next();
    } else {
      return res.status(401).json({
        message: "Authentication failure",
      });
    }
  }
};

exports.createUser = async (username, userEmail, userAge) => {
  let user = new UserModel({
    name: username,
    email: userEmail,
    age: userAge,
  });
  user = await user.save().catch(e => {
    return e;
  });
  return user;
};

exports.checkUserIsOwnerById = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Authentication required",
    });
  } else {
    const user = await UserModel.find({ owner_id: req.headers.authorization }).catch(e => {
      console.log(e);
    });
    // console.log(user);
    if (user) {
      res.locals.auth = {
        user,
      };
      next();
    } else {
      return res.status(401).json({
        message: "Authentication failure",
      });
    }
  }
};

exports.getUserById = async userId => {
  user = await UserModel.find({ _id: userId }).catch(e => {
    return e;
  });
  return user;
};

exports.getAllUsers = async () => {
  users = await UserModel.find().catch(e => {
    return e;
  });
  return users;
};
