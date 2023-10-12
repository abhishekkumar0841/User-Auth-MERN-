const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: [true, "This user name is already registered!"],
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "This user email is already registered!"],
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
      select: false,
    },
    // forgetPasswordToken & forgetPasswordExpiryDate is used in future
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiryDate: {
      type: Date,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true }
);

//defining custom methods for generating jwtToken
userSchema.methods = {
  jwtToken() {
    return JWT.sign(
      // jwt takes 3 parameters for generating jwtToken 1st->data, 2nd->secretKey, 3re->expiries
      { id: this._id, email: this.email, userName: this.userName },
      process.env.SECRET,
      { expiresIn: "24hr" }
    );
  },
};

//defining custom middleware on schema for password encryption
//with this custom middleware i triggering the pre method that runs or execute when any one try to save any thing related to userSchema this middleware encrypt the password and then save into database.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.isModified('confirmPassword')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10)

  return next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
