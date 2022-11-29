const User = require("../models/authModel");
const messageModel = require("../models/messageModel");

module.exports.getFriends = async (req, res) => {
  const myId = req.myId;
  try {
    const friendGet = await User.find({});
    const filter = friendGet.filter((d) => d.id !== myId);
    res.status(200).json({ success: true, friends: filter });
  } catch (e) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

module.exports.messageUploadToDB = async (req, res) => {
  const { senderName, receiverId, message } = req.body;
  const senderId = req.myId;

  try {
    const insertMessage = await messageModel.create({
      senderId,
      senderName,
      receiverId,
      message: { text: message, image: "" },
    });
    res.status(200).json({ success: true, message: insertMessage });
  } catch (e) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};

module.exports.messageGet = async (req, res) => {
  const myId = req.myId;
  const fdId = req.params.id;

  try {
    let getAllMessages = await messageModel.find({});
    getAllMessages = getAllMessages.filter(
      (each) =>
        (each.senderId === myId && each.receiverId === fdId) ||
        (each.receiverId === myId && each.senderId == fdId)
    );
    res.status(200).json({ success: true, message: getAllMessages });
  } catch (e) {
    res.status(500).json({
      error: {
        errorMessage: "Internal Server Error",
      },
    });
  }
};
