const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class PromotionService {
  constructor() {
    this.promotions = [];
    this.generatePromotions();
  }

  generatePromotions() {
    const promotions = Array.from({ length: 10 }, (_, index) => ({
      id: faker.database.mongodbObjectId(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.url(),
      isBlock: faker.datatype.boolean(),
    }));
    this.promotions = promotions;
  }

  getPromotions() {
    return this.promotions;
  }

  getPromotion(id) {
    const promotion = this.promotions.find((promotion) => promotion.id === id);
    if (!promotion) {
      throw boom.notFound('Promotion not found');
    }
    return promotion;
  }

  createPromotion(data) {
    const newPromotion = {
      id: faker.database.mongodbObjectId(),
      ...data,
    };
    this.promotions.push(newPromotion);
    return newPromotion;
  }

  updatePromotion(id, data) {
    const index = this.promotions.findIndex((promotion) => promotion.id === id);
    if (index === -1) {
      throw boom.notFound('Promotion not found');
    }
    this.promotions[index] = {
      ...this.promotions[index],
      ...data,
    };
    return this.promotions[index];
  }

  deletePromotion(id) {
    const index = this.promotions.findIndex((promotion) => promotion.id === id);
    if (index === -1) {
      throw boom.notFound('Promotion not found');
    }
    this.promotions.splice(index, 1);
    return { id };
  }
}

module.exports = PromotionService;
