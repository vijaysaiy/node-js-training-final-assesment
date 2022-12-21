import * as carServices from "./cars.services.js";

export const addCar = async (req, res) => {
  try {
    const newCar = await carServices.addCar(req.body);
    res.json({ status: "success", data: newCar });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const addManyCars = async (req, res) => {
  try {
    const newCars = await carServices.addMany(req.body);
    res.json({ status: "success", data: newCars });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const listCars = async (req, res) => {
  try {
    const list = await carServices.listCars();
    res.json({ status: "success", data: list });
  } catch (error) {
    res.json({ status: "success", message: error.message });
  }
};

export const getFastestCar = async (req, res) => {
  try {
    const fastestCar = await carServices.getFastestCar();
    res.json({ status: "success", data: fastestCar });
  } catch (error) {
    res.json({ status: "success", message: error.message });
  }
};
