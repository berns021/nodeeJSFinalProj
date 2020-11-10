const UserLogModel = require('../models/userLogModel');
const UserModel = require('../models/userModel');

exports.getUserLogs = async function (req, res) {
  // query userLogs with user with 2 filtered properties (emailAddress, username)
  const userLogs = await UserLogModel.find({})
    .populate('user', ['emailAddress', 'username']);

  res.send(userLogs);
};

exports.getUserLogsByUser = async function (req, res) {
  const userId = req.params.userId;

  const userLogs = await UserLogModel.find({ user: userId })
    .populate('user', ['emailAddress', 'username']);

  res.send(userLogs);
};

exports.getUserLog = async function (req, res, next) {
  try {
    const id = req.params.id;

    // query userLog with user with 2 filtered properties (emailAddress, username)
    const userLog = await UserLogModel.findById(id)
      .populate('user', ['emailAddress', 'username']);

    res.send(userLog);
  } catch (e) {
    next(e);
  }
};

exports.insertUserLog = async function (req, res, next) {
  try {
    const { userId, activity } = req.body;

    const userDoc = await UserModel.findById(userId);

    const userLogDoc = new UserLogModel({
      activity,
      user: userDoc._id
    });

    // need to add the userLogId to userLogs[] in order for user to populate userLogs from userController
    // https://mongoosejs.com/docs/populate.html#refs-to-children
    userDoc.userLogs.push(userLogDoc._id);

    await userLogDoc.save();
    await userDoc.save();

    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
};

exports.updateUserLog = async function (req, res, next) {
  try {
    const id = req.params.id;

    await UserLogModel.findByIdAndUpdate(id, req.body);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

exports.deleteUserLog = async function (req, res, next) {
  try {
    const id = req.params.id;

    await UserLogModel.findByIdAndDelete(id);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
};

exports.deleteUserLogsByUser = async function (req, res, next) {
  try {
    const userId = req.params.userId;

    const query = await UserLogModel.deleteMany({ user: userId });

    res.send({
      deletedCount: query.deletedCount
    });
  } catch (e) {
    next(e);
  }
};
