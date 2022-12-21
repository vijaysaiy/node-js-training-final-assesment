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

export const findById = async (id) => {
  return await Cars.findById(id);
};

export const getFastestCar = async () => {
  return await Cars.aggregate([
    {
      $group: { _id: "$_id", topSpeed: { $max: "$topSpeed.speed" } },
    },
    {
      $sort: {
        topSpeed: -1,
      },
    },
    { $limit: 1 },
    {
      $lookup: {
        from: "cars",
        localField: "_id",
        foreignField: "_id",
        as: "car",
      },
    },
    {
      $unwind: {
        path: "$car",
      },
    },
    {
      $project: {
        car: "$car",
      },
    },
  ]);
};
