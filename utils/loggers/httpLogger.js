import morgan from "morgan";
import { logger } from "./logger.js";

const options = {
  stream: {
    write: (message) => logger.info(message),
  },
};

export const httpLogger = morgan("tiny", options);
