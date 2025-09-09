import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  MONGO_URI: Joi.string().required(),
  GOOGLE_API_KEY: Joi.string().required(),
  // JWT_SECRET: Joi.string().min(10).required(),

  LANGSMITH_TRACING: Joi.boolean().default(false),
  LANGSMITH_API_KEY: Joi.string().when('LANGSMITH_TRACING', {
    is: true,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  LANGCHAIN_CALLBACKS_BACKGROUND: Joi.boolean().default(true),
  LANGCHAIN_PROJECT: Joi.string().default('nestjs-saas-study'),
});
