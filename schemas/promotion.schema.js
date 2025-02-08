const Joi = require('joi');

const id = Joi.string().alphanum();
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(10);
const image = Joi.string();
const isBlock = Joi.boolean();

const createPromotionSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlock: isBlock.required(),
});

const updatePromotionSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlock: isBlock,
});

const getPromotionSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPromotionSchema,
  updatePromotionSchema,
  getPromotionSchema,
};
