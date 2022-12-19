import { Cars } from "./cars.model.js";

export const addCar = async (carData) => {
  const car = new Cars(carData);
  return await car.save();
};

export const addMany = async (carData) => {
  return await Cars.insertMany(carData);
};

export const listCars = async () => {
  return await Cars.find();
};
