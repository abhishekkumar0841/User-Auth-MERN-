import User from "../models/user.model.js";

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  //   secure: true,
};

const userSignup = async (req, res, next) => {
  try {
    const { fullName, email, password, role, bio } = req.body;
    if (!fullName || !email || !password) {
      return res.status(402).json({
        success: false,
        message: "Full name, email and password is required",
      });
    }

    //check if user email is already registered
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.status(401).json({
        success: false,
        message: "This email is already registered!",
      });
    }

    const user = await User.create({ fullName, email, password, role, bio });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `This ${email} email is not registered with us, kindly singup first`,
      });
    }

    const checkPassword = await user.comparePassword(password);

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Wrong password!",
      });
    }

    const token = await user.generateJwtToken();

    user.password = undefined;

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: `Welcome back ${user.fullName}`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const userLogout = async (req, res, next)=>{
  res.cookie('token', null, {
    maxAge: 0,
    httpOnly: true,
    // secure: true,
  })

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
}

const getUser = async (req, res, next) => {
  try {
    const {id} = req.user;

    const user = await User.findById(id)

    if(!user){
        return res.status(400).json({
            success: false,
            message: "User does not exists!",
        })
    }

    return res.status(200).json({
        success: true,
        message: "User get successfully",
        user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { userSignup, userLogin, getUser, userLogout };
