const userModel = require("../models/userModel");
const emailValidator = require("email-validator");

exports.userSignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      bio,
    } = req.body;

    //validating
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !email ||
      !password ||
      !confirmPassword ||
      !bio
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const validEmail = emailValidator.validate(email);

    if(!validEmail){
        return res.status(400).json({
            success: false,
            message: "Please provide a valid email!",
          });
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Password and confirm password should be same!",
          });
    }

    // const userInfo = userModel({firstName, lastName, userName, email, password, confirmPassword, bio})

    const userInfo = userModel(req.body);

    const savedUser = await userInfo.save();

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: savedUser,
    });
  } catch (error) {
    //mongoose provides us the functionality if user trying to registered with already existing email or user name then we can specially convey the user with specific message.
    if (error.code === 11000) {
      return res.status(404).json({
        success: false,
        message: "Account already existed with provide email id!",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error while user signup!",
      data: error.message,
    });
  }
};
