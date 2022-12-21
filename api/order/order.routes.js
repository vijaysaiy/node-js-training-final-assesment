import express from "express";
import { authenticate } from "../../utils/authenticate.js";
import {
  createOrder,
  getAllOrders,
  getHighestRatedCar,
  getMostDaysRentedCar,
  getMostOrderedCar,
  rateOrder,
} from "./order.controller.js";

export const orderRouter = express.Router();

orderRouter.post("/create", authenticate, createOrder);
orderRouter.get("/list", authenticate, getAllOrders);
orderRouter.get("/most-ordered", authenticate, getMostOrderedCar);
orderRouter.get("/rented-most-days", authenticate, getMostDaysRentedCar);
orderRouter.post("/rateOrder/:orderId", authenticate, rateOrder);
orderRouter.get("/highest-rated", authenticate, getHighestRatedCar);
