import { createToken } from "../../utils/authenticate.js";
import { hashPassword, verifyPassword } from "../../utils/hashpassword.js";
import { User } from "./user.model.js";
export const register = async (userData) => {
  try {
    const hashedPassword = await hashPassword(userData.password);
    const newUser = new User({ ...userData, password: hashedPassword });
    return await newUser.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("User already Exists");
    } else {
      throw error;
    }
  }
};

export const login = async (userData) => {
  try {
    const user = await User.findOne({
      email: userData.email,
    }).select("+password");
    if (user && (await verifyPassword(user.password, userData.password))) {
      const accessToken = createToken(user._doc);
      user.password = undefined;
      user._doc.accessToken = accessToken;
      return user;
    } else {
      throw new Error("User doesn't exist/ invalid credentials");
    }
  } catch (error) {
    throw error;
  }
};
