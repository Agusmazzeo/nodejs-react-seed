const { UserModel } = require("../db/dbConfig");

exports.checkExistingUsername = async (username, userEmail) => {
  const existsUser = await UserModel.find({ user_name: username });
  const existsEmail = await UserModel.find({ email: userEmail });
  return existsUser.length || existsEmail.length;
};

exports.checkUserExistsById = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Authentication required",
    });
  } else {
    const user = await UserModel.findById(req.headers.authorization).catch(e => {
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
