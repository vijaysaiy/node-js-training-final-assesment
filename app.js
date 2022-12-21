import cors from "cors";
import express from "express";
import { carsRouter } from "./api/cars/cars.routes.js";
import { orderRouter } from "./api/order/order.routes.js";
import { paymentRouter } from "./api/payments/payments.routes.js";
import { userRouter } from "./api/user/user.routes.js";
import { connectToMonogoDB } from "./config/db.js";
import { httpLogger } from "./utils/loggers/httpLogger.js";
import { logger } from "./utils/loggers/logger.js";

const main = async () => {
  await connectToMonogoDB();

  const app = express();

  // FOR RAZOR PAY PAYMENTS
  app.use(express.urlencoded({ extended: true }));

  // TO ACCEPT JSON DATA
  app.use(express.json());
  // TO ALLOW cross origin sites
  app.use(cors());

  // View engine to use templates
  app.set("view engine", "ejs");

  app.use(httpLogger);

  // MAIN APIS
  app.use("/api/users", userRouter);
  app.use("/api/cars", carsRouter);
  app.use("/api/orders", orderRouter);
  app.use("/api/payments", paymentRouter);

  app.listen(process.env.PORT || 4000, () => {
    logger.info(`Server is up and running at port ${process.env.PORT}`);
  });
};

main();
