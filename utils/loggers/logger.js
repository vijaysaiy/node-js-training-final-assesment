import dotenv from "dotenv";
import winston from "winston";
import winstonMongo from "winston-mongodb";

dotenv.config();
const mon = winstonMongo;
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: "HH:mm:ss.SSS" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.MongoDB({
      db: process.env.MONGO_URI,
      collection: "applicationLogs",
      options: { useUnifiedTopology: true },
    }),
  ],
});
