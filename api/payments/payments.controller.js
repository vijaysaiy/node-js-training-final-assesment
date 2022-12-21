import dotenv from "dotenv";
import * as paymentService from "./payments.service.js";
dotenv.config();
export const verify = async (req, res) => {
  console.log(req.body);
  await paymentService.verify(req.body);
  res.json({ status: "success" });
};

export const paymentForm = async (req, res) => {
  const razorpayKeyId = process.env.RAZORPAY_KEY;
  const paymentOrderId = req.params.paymentOrderId;
  res.render("paymentForm", { razorpayKeyId, paymentOrderId });
};
