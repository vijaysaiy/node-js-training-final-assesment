import dotenv from "dotenv";
import mongoose from "mongoose";
import { logger } from "../utils/loggers/logger.js";

dotenv.config();

export const connectToMonogoDB = async () => {
  logger.info("Connecting to MongoDB");
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Failed to connect to MongoDB" + error);
  }
};
