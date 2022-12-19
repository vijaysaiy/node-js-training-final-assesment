import argon from "argon2";

export const hashPassword = (password) => {
  return argon.hash(password);
};

export const verifyPassword = (hashedPassword, password) => {
  return argon.verify(hashedPassword, password);
};
