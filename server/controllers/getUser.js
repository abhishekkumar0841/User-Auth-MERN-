const userModel = require("../models/userModel");

exports.getUser = async (req, res) => {
  const userId = req.user.id;
  const user = await userModel.findById(userId);

  try {
    return res.status(200).json({
      success: true,
      message: "User get successfully",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error while getting user!",
      data: error.message,
    });
  }
};
