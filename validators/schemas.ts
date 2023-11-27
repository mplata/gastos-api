import Joi from 'joi';

const expenseSchema = Joi.object({
  concept: Joi.string().required(),
  amount: Joi.number().required().greater(0),
  category: Joi.string().required().empty(),
});

const filtersSchema = Joi.object({
  from: Joi.date().optional(),
  to: Joi.date().optional(),
});
export {
  expenseSchema,
  filtersSchema,
};
