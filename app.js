import cors from "cors";
import express from "express";
import { carsRouter } from "./api/cars/cars.routes.js";
import { userRouter } from "./api/user/user.routes.js";
import { connectToMonogoDB } from "./config/db.js";
import { httpLogger } from "./utils/loggers/httpLogger.js";
import { logger } from "./utils/loggers/logger.js";

const main = async () => {
  await connectToMonogoDB();
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(httpLogger);

  // MAIN APIS
  app.use("/api/users", userRouter);
  app.use("/api/cars", carsRouter);

  app.listen(process.env.PORT || 4000, () => {
    logger.info(`Server is up and running at port ${process.env.PORT}`);
  });
};

main();
