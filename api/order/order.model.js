import mongoose from "mongoose";

import { carSchema } from "../cars/cars.model.js";

export const Order = mongoose.model(
  "Order",
  new mongoose.Schema(
    {
      user: {
        type: String,
      },
      rentedCar: {
        car: carSchema,
        rentPerDay: Number,
        noOfDays: Number,
      },
      totalAmount: Number,
      status: {
        type: String,
        enum: [
          "pending_approval",
          "approved",
          "rejected",
          "cancelled",
          "payment_pending",
        ],
        default: "pending_approval",
      },
      paymentId: { type: String },
      rating: Number,
    },
    { timestamps: true }
  )
);
