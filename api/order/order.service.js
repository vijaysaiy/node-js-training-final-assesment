import { findById } from "../cars/cars.services.js";
import { createPaymentOrder } from "../payments/payments.service.js";
import { Order } from "./order.model.js";

export const completePayment = async (isValid, paymentOrderId, paymentId) => {
  if (!isValid) {
    await Order.findOneAndUpdate(
      {
        paymentOrderId,
      },
      { status: "payment_failed", paymentId }
    );
    throw new Error("Invalid payment");
  } else {
    await Order.findOneAndUpdate(
      { paymentOrderId },
      {
        status: "payment_success",
        paymentId,
      },
      { new: true }
    );
  }
};

export const placeOrder = async (orderData) => {
  const car = await findById(orderData.carId);
  const totalAmount =
    Math.round(car.pricePerDay * orderData.noOfDays * 100) / 100;

  try {
    const newOrder = new Order({
      user: orderData.user,
      rentedCar: {
        car,
        rentPerDay: car.pricePerDay,
        noOfDays: orderData.noOfDays,
      },
      totalAmount,
    });
    await newOrder.save();  // save the order initially and initiate payment process
    const paymentOrder = await createPaymentOrder(newOrder._id, totalAmount); // gets the razorpay paymentOrder id
    newOrder.status = "payment_pending";
    newOrder.paymentId = paymentOrder.id;
    await newOrder.save(); // add status and razorpayOrder id and save the order againg(overwrites)
    return {
      orderId: newOrder._id,
      totalAmount,
      razorpayOrderId: paymentOrder.id, // use this to make payment
      currency: "INR",
    };
  } catch (error) {
    throw error;
  }
};

export const getAllOrders = async () => {
  return await Order.find();
};

export const getMostOrderedCar = async () => {
  const mostOrderedCar = await Order.aggregate([
    {
      $match: {
        status: "payment_pending",   // filters the payment_pending orders (not taking completed orders as some payments are more than 40K which exceeds razorpay limit)
      },
    },
    {
      $unwind: {
        path: "$rentedCar",
      },
    },
    {
      $group: {
        _id: "$rentedCar.car._id",
        totalTimesOrdered: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalTimesOrdered: -1,
      },
    },
    {
      $limit: 1,
    },
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
        totalTimesOrdered: 1,
      },
    },
  ]);
  return mostOrderedCar;
};

export const getMostDaysRentedCar = async () => {
  const mostDaysRentedCar = await Order.aggregate([
    {
      $match: {
        status: "payment_pending",
      },
    },
    {
      $unwind: {
        path: "$rentedCar",
      },
    },
    {
      $group: {
        _id: "$rentedCar.car._id",
        totalDaysRented: {
          $sum: "$rentedCar.noOfDays",
        },
      },
    },
    {
      $sort: {
        totalDaysRented: -1,
      },
    },
    {
      $limit: 1,
    },
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
        totalDaysRented: 1,
      },
    },
  ]);
  return mostDaysRentedCar;
};

export const rateOrder = async (orderId, rating) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { rating },
    { new: true }
  );
  return order;
};

export const getHighestRatedCar = async (req, res) => {
  const highestRatedCar = await Order.aggregate([
    {
      $group: {
        _id: "$rentedCar.car._id",
        averageRating: { $avg: "$rating" },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },
    {
      $limit: 1,
    },
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
        averageRating: 1,
      },
    },
  ]);
  return highestRatedCar;
};
