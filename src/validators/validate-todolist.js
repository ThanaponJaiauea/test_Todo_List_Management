import Joi from "joi";

// กำหนดเงื่อนไขการตรวจสอบ
const todoSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),
  description: Joi.string()
    .trim()
    .allow("", null),
}).unknown(true);

const validateTodoInput = (input) => {
  const { error } = todoSchema.validate(input, {
    abortEarly: false, 
  });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    return result;
  }
  
  return null;
};

export default validateTodoInput;