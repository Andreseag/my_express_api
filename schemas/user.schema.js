const Joi = require('joi');

const id = Joi.string().alphanum();
const name = Joi.string().min(3).max(30);
const email = Joi.string().email();
const image = Joi.string().uri();
const isBlock = Joi.boolean();

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  image: image.required(),
  isBlock: isBlock.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  email: email,
  image: image,
  isBlock: isBlock,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
};
