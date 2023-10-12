const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')

exports.userLogin = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // validation
    if (!(userName || email) || !password) {
      return res.status(404).json({
        success: false,
        message: "All fields are required!",
      });
    }

    let user;
    if(userName){
        user = await userModel.findOne({userName}).select("+password")
    }else if(email){
        user = await userModel.findOne({email}).select("+password")
    }

    if(!user){
        return res.status(400).json({
            success: false,
            message: "User is not registered with us, Please Sign up first!",
          });
    }

    //here bcrypt.compare takes 2 parameters 1st-> raw password, 2nd-> encrypted password.
    if(!await bcrypt.compare(password, user.password) ){
        return res.status(400).json({
            success: false,
            message: "Wrong Password, try again!",
          });
    }

    //fetching token for sending through cookie
    const token = user.jwtToken() //here we call jwtToken() custom methods which i write inside userModel

    //setting password to undefined
    user.password = undefined
    user.confirmPassword = undefined

    //setting token on cookie
    const cookieOptions = {
        maxAge: 24 * 60 * 60 * 1000, //time duration of cookie exist after this time cooke expired automatically
        httpOnly: true //not any can access cookie on client side
    }
    res.cookie("token", token, cookieOptions)

    return res.status(200).json({
        success: true,
        message: "User Login Successfully",
        data: user,
        userToken: token,
      });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while user login!",
      data: error.message
    });
  }
};
