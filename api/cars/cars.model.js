import mongoose from "mongoose";
export const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    pricePerDay: {
      type: Number,
    },
    topSpeed: {
      speed: {
        type: Number,
      },
      unit: {
        type: String,
        enum: ["km/h", "m/h"],
      },
    },
    range: {
      type: String,
    },
    transmissionType: {
      type: String,
      enum: ["Manual", "Automatic"],
      default: "Automatic",
    },
    carType: {
      type: String,
      enum: ["ON", "PB"],
      default: "PB",
    },
  },
  { timestamps: true }
);
export const Cars = mongoose.model("Cars", carSchema);
