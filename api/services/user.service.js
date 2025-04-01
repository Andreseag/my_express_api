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

  addUser(user) {
    const newUser = {
      id: faker.database.mongodbObjectId(),
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  async getUsers() {
    const rta = await models.User.findAll();
    return rta;
  }

  async getUserById(id) {
    const rta = await models.User.findByPk(id);
    if (!rta) {
      throw boom.notFound('User not found');
    }
    return rta;
  }

  updateUser(id, data) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users[index] = {
      ...this.users[index],
      ...data,
    };
    return this.users[index];
  }

  deleteUser(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw boom.notFound('User not found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UserService;
