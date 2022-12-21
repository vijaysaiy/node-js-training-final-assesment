import * as orderServices from "./order.service.js";

export const createOrder = async (req, res) => {
  const user = req.user._id;
  try {
    const order = await orderServices.placeOrder({
      user: req.user._id,
      ...req.body,
    });
    res.json({ status: "success", data: order });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderServices.getAllOrders();
    res.json({ status: "success", data: orders });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const getMostOrderedCar = async (req, res) => {
  try {
    const car = await orderServices.getMostOrderedCar();
    res.json({ status: "success", data: car });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const getMostDaysRentedCar = async (req, res) => {
  try {
    const car = await orderServices.getMostDaysRentedCar();
    res.json({ status: "success", data: car });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const rateOrder = async (req, res) => {
  try {
    const order = await orderServices.rateOrder(
      req.params.orderId,
      req.body.rating
    );
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const getHighestRatedCar = async (req, res) => {
  try {
    const car = await orderServices.getHighestRatedCar();
    console.log("car", car);
    res.json({ status: "success", data: car });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};
