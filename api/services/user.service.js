const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }

  async generate() {
    const users = Array.from({ length: 10 }, (_, index) => ({
      id: faker.database.mongodbObjectId(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      isBlock: faker.datatype.boolean(),
    }));

    this.users = users;
  }

  async addUser(user) {
    const newUser = await models.User.create(user);
    return newUser;
  }

  async getUsers() {
    const rta = await models.User.findAll();
    return rta;
  }

  async getUserById(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  async updateUser(id, changes) {
    const user = await this.getUserById(id);
    const rta = user.update(changes);
    return rta;
  }

  async deleteUser(id) {
    const user = await this.getUserById(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
