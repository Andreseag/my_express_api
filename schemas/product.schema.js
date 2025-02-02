const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().alphanum().min(3).max(30);
const price = Joi.number().integer().min(10);
const image = Joi.string();
const isBlock = Joi.boolean();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock: isBlock.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlock: isBlock,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
