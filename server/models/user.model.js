import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    bio: {
      type: String,
    },
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

//password hashing method
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  generateJwtToken: async function () {
    return jwt.sign(
        //payload
      {
        id: this._id,
        fullName: this.fullName,
        role: this.role,
        email: this.email,
      },
        //jwt secret
      process.env.JWT_SECRET,
        //jwt expiry
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  },

  //comparing password methods
  comparePassword: async function(string){
    return await bcrypt.compare(string, this.password)
  }
};

const User = model("User", userSchema);
export default User;
