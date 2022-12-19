import * as userServices from "./user.service.js";

export const register = async (req, res) => {
  try {
    const newUser = await userServices.register(req.body);
    res.json({ status: "success", data: newUser });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await userServices.login(req.body);
    res.json({ status: "success", data: user });
  } catch (error) {
    res.json({ status: "failed", message: error.message });
  }
};
