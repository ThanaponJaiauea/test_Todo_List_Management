import Joi from "joi";

const registerSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "passwords do not match",
    }),
  mobile: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Mobile number must be 10 digits",
    }),
});

const validateRegisterInput = (input) => {
  const { error } = registerSchema.validate(input, {
    abortEarly: false,
  });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
};

export default validateRegisterInput;
