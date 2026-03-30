import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).unknown(true);

const validateLoginInput = (input) => {
  const { error } = loginSchema.validate(input, {
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

export default validateLoginInput;
