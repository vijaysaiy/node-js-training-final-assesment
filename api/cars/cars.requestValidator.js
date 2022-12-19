import joiValidator from "express-joi-validation";
import joi from "joi";

const validator = joiValidator.createValidator({});

export const addCarValidator = validator.body(
  joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().required(),
    range: joi.string().required(),
    pricePerDay: joi.number().required(),
    topSpeed: joi.object({
      speed: joi.number().required(),
      unit: joi.string().valid("km/h", "m/h").required(),
    }),
    transmissionType: joi.string().valid("Manual", "Automatic").required(),
    carType: joi.string().valid("ON", "PB").required(),
  })
);
