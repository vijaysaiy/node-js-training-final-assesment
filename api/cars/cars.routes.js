import express from "express";
import {
  addCar,
  addManyCars,
  getFastestCar,
  listCars,
} from "./cars.controller.js";
import { addCarValidator } from "./cars.requestValidator.js";

export const carsRouter = express.Router();

carsRouter.post("/add", addCarValidator, addCar);
carsRouter.post("/addMany", addCarValidator, addManyCars);
carsRouter.get("/list", listCars);
carsRouter.get("/fastest", getFastestCar);
