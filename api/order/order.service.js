import { Order } from "./order.model.js";

export const completePayment = async (isValid, paymentOrderId, paymentId) => {};

export const placeOrder = async (orderData) => {
  const totalAmount =
    Math.round(orderData.pricePerDay * orderData.noOfDays * 100) / 100;

  try {
    const newOrder = new Order({
      user: orderData.user,
      rentedCar: {
        car: orderData.carId,
        rentPerDay: orderData.pricePerDay,
        noOfDays: orderData.noOfDays,
      },
      totalAmount,
    });
    await newOrder.save();
    const paymentOrder = await createPaymentOrder(newOrder._id, totalAmount);
    newOrder.status = "payment_pending";
    newOrder.paymentId = paymentOrder.id;
    await newOrder.save();
    return {
      orderId: newOrder._id,
      totalAmount,
      razorpayOrderId: paymentOrder.id,
      currency: "INR",
    };
  } catch (error) {
    throw error;
  }
};
