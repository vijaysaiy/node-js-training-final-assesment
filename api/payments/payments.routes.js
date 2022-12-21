import express from "express";
import { paymentForm, verify } from "./payments.controller.js";

export const paymentRouter = express.Router();

paymentRouter.post("/verify", verify);
paymentRouter.get("/paymentForm/:paymentOrderId", paymentForm);
