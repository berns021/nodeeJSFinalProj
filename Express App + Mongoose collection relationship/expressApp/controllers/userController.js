const UserModel = require('../models/userModel');

exports.getUsers = async function (req, res) {
  // query users with userLogs with 1 filtered property (activity)
  const users = await UserModel.find({})
    .populate('userLogs', ['activity']);

  res.send(users);
};

exports.getUser = async function (req, res, next) {
  try {
    const id = req.params.id;
    // query user with userLogs with 1 filtered property (activity)
    const user = await UserModel.findById(id)
      .populate('userLogs', ['activity']);

    res.send(user);
  } catch (e) {
    next(e);
  }
};

exports.insertUser = async function (req, res, next) {
  try {
    const user = new UserModel(req.body);

    await user.save();

    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
};

exports.updateUser = async function (req, res, next) {
  try {
    const id = req.params.id;

    await UserModel.findByIdAndUpdate(id, req.body);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

exports.deleteUser = async function (req, res, next) {
  try {
    const id = req.params.id;

    await UserModel.findByIdAndDelete(id);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};
