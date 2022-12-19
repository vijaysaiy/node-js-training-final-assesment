import mongoose from "mongoose";
import validator from "validator";

export const User = mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
        validate: {
          validator: validator.isEmail,
          message: "{VALUE} is not a valid email",
        },
        trim: true,
        lowercase: true,
      },
      mobile: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
        select: false,
      },
    },
    { timestamps: true }
  )
);
