import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { logger } from "./loggers/logger.js";

dotenv.config();

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7, authHeader.length);
    const user = verifyToken(token);

    if (user) {
      req.user = user;
      next();
    }
  } else
    res
      .status(403)
      .send({ status: "failure", message: "Please login to continue" });
};

export const authenticateUsingSession = async (req, res, next) => {
  const user = req.session?.user;

  if (user) {
    req.user = user;
    next();
    return;
  }
  res
    .status(403)
    .send({ status: "failure", message: "Please login to continue" });
};

export const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    logger.error("Invalid token: ", token);
    throw new Error("Invalid token");
  }
};
