exports.userLogout = async (req, res) => {
  try {
    const cookieOptions = {
      expiresIn: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookieOptions);
    res.status(200).json({
      success: true,
      message: "User successfully logged out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while logging out!",
      data: error.message,
    });
  }
};
